import { JsonConvert } from "json2typescript";
import { forkJoin, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { ListNodeCache, OntologyCache } from "../../../";
import { IResourceClassAndPropertyDefinitions } from "../../../cache/OntologyCache";
import { Constants } from "../Constants";
import { ResourcePropertyDefinition } from "../ontologies/resource-property-definition";
import { CountQueryResponse } from "../search/count-query-response";
import { ReadResource } from "./read-resource";
import { ReadBooleanValue } from "./values/read-boolean-value";
import { ReadColorValue } from "./values/read-color-value";
import { ParseReadDateValue, ReadDateValue } from "./values/read-date-value";
import { ReadDecimalValue } from "./values/read-decimal-value";
import { ReadStillImageFileValue } from "./values/read-file-value";
import { ParseReadGeomValue, ReadGeomValue } from "./values/read-geom-value";
import { ReadIntValue } from "./values/read-int-value";
import { ReadIntervalValue } from "./values/read-interval-value";
import { ReadLinkValue } from "./values/read-link-value";
import { ReadListValue } from "./values/read-list-value";
import {
    ReadTextValue,
    ReadTextValueAsHtml,
    ReadTextValueAsString,
    ReadTextValueAsXml
} from "./values/read-text-value";
import { ReadUriValue } from "./values/read-uri-value";
import { ReadValue } from "./values/read-value";

export namespace ResourcesConversionUtil {

    /**
     * Given a JSON-LD representing zero, one more resources, converts it to an array of ReadResource.
     *
     * JSON-LD is expected to have expanded prefixes (processed by jsonld processor).
     *
     * @param resourcesJsonld a JSON-LD object  with expanded prefixes representing zero, one or more resources.
     * @param ontologyCache instance of OntologyCache to be used.
     * @param listNodeCache instance of ListNodeCache to be used.
     * @param jsonConvert instance of JsonConvert to be used.
     */
    export const createReadResourceSequence = (resourcesJsonld: object, ontologyCache: OntologyCache, listNodeCache: ListNodeCache, jsonConvert: JsonConvert): Observable<ReadResource[]> => {

        if (resourcesJsonld.hasOwnProperty("@graph")) {
            // sequence of resources
            return forkJoin((resourcesJsonld as { [index: string]: object[] })["@graph"]
                .map((res: { [index: string]: object[] | string }) => createReadResource(res, ontologyCache, listNodeCache, jsonConvert)));
        } else {
            //  one or no resource
            if (Object.keys(resourcesJsonld).length === 0) {
                return of([]);
            } else {
                return forkJoin([createReadResource(resourcesJsonld as { [index: string]: object[] | string }, ontologyCache, listNodeCache, jsonConvert)]);
            }
        }
    };

    /**
     * Creates a single ReadResource.
     *
     * @param resourceJsonld a JSON-LD object representing a single resource.
     * @param ontologyCache instance of OntologyCache to be used.
     * @param listNodeCache instance of ListNodeCache to be used.
     * @param jsonConvert instance of JsonConvert to be used.
     */
    const createReadResource = (resourceJsonld: { [index: string]: string | object[] }, ontologyCache: OntologyCache, listNodeCache: ListNodeCache, jsonConvert: JsonConvert): Observable<ReadResource> => {

        // console.log("parsing ", resourceJsonld["@id"]);

        if (Array.isArray(resourceJsonld)) throw new Error("resource is expected to be a single object");

        // determine resource class
        const resourceType = resourceJsonld["@type"] as string;

        return ontologyCache.getResourceClassDefinition(resourceType).pipe(mergeMap(
            (entitiyDefs: IResourceClassAndPropertyDefinitions) => {

                const resourceProps: string[] = Object.keys(resourceJsonld)
                    .filter((propIri: string) => {
                        return entitiyDefs.properties[propIri] instanceof ResourcePropertyDefinition;
                    });

                // console.log("props ", resourceProps);

                const resource = jsonConvert.deserialize(resourceJsonld, ReadResource) as ReadResource;

                // add information from ontology
                resource.resourceClassLabel = entitiyDefs.classes[resourceType].label;
                resource.resourceClassComment = entitiyDefs.classes[resourceType].comment;

                if (resourceProps.length > 0) {

                    const values: Array<Observable<ReadValue>> = [];

                    resourceProps.forEach((propIri: string) => {

                        if (Array.isArray(resourceJsonld[propIri])) {
                            for (const value of resourceJsonld[propIri]) {
                                values.push(createValueValue(propIri, value, entitiyDefs, ontologyCache, listNodeCache, jsonConvert));
                            }
                        } else {
                            values.push(createValueValue(propIri, resourceJsonld[propIri], entitiyDefs, ontologyCache, listNodeCache, jsonConvert));
                        }
                    });

                    return forkJoin(values).pipe(map(
                        (vals: ReadValue[]) => {

                            // get link values
                            const linkVals: ReadLinkValue[] = vals.filter((val: ReadValue) => {
                                return val instanceof ReadLinkValue;
                            }) as ReadLinkValue[];

                            // incoming references with embedded resource
                            const incomingRefs: ReadLinkValue[] = linkVals.filter((linkVal: ReadLinkValue) => {
                                return linkVal.incoming && linkVal.linkedResource !== undefined;
                            });

                            // outgoing references with embedded resource
                            const outgoingRefs = linkVals.filter((linkVal: ReadLinkValue) => {
                                return !linkVal.incoming && linkVal.linkedResource !== undefined;
                            });

                            // create a map structure property Iri -> values
                            const propMap: { [index: string]: ReadValue[] } = {};

                            vals.forEach((val: ReadValue) => {
                                if (!propMap.hasOwnProperty(val.property)) {
                                    propMap[val.property] = [val];
                                } else {
                                    propMap[val.property].push(val);
                                }
                            });

                            // assign values
                            resource.properties = propMap;

                            resource.incomingReferences = incomingRefs.map((linkVal: ReadLinkValue) => linkVal.linkedResource as ReadResource);

                            resource.outgoingReferences = outgoingRefs.map((linkVal: ReadLinkValue) => linkVal.linkedResource as ReadResource);

                            return resource;
                        }
                    ));
                } else {
                    return of(resource);
                }

            }
        ));

    };

    /**
     * Converts a simple value serialized as JSON-LD to a `ReadValue`.
     *
     * @param valueJsonld value as JSON-LD to be converted.
     * @param dataType the specific value type to convert to.
     * @param jsonConvert the converter to be used.
     */
    const handleSimpleValue = (valueJsonld: object, dataType: { new(): ReadValue }, jsonConvert: JsonConvert): Observable<ReadValue> => {
        return of(jsonConvert.deserialize(valueJsonld, dataType) as ReadValue);
    };

    /**
     * Converts a text value serialized as JSON-LD to a `ReadTextValue`.
     *
     * @param valueJsonld text value as JSON-LD to be converted.
     * @param jsonConvert jsonConvert the converter to be used.
     */
    const handleTextValue = (valueJsonld: object, jsonConvert: JsonConvert): Observable<ReadTextValue> => {

        if (valueJsonld.hasOwnProperty(Constants.ValueAsString)) {
            // TODO: query standoff, if any.
            const textValue =
                jsonConvert.deserialize(valueJsonld, ReadTextValueAsString) as ReadTextValueAsString;
            return of(textValue);
        } else if (valueJsonld.hasOwnProperty(Constants.TextValueAsXml)) {
            const textValue =
                jsonConvert.deserialize(valueJsonld, ReadTextValueAsXml) as ReadTextValueAsXml;
            return of(textValue);
        } else if (valueJsonld.hasOwnProperty(Constants.TextValueAsHtml)) {
            const textValue =
                jsonConvert.deserialize(valueJsonld, ReadTextValueAsHtml) as ReadTextValueAsHtml;
            return of(textValue);
        } else {
            throw new Error("Invalid Text value");
        }
    };

    /**
     * Converts a link value serialized as JSON-LD to a `ReadTextValue`.
     *
     * @param valueJsonld link value as JSON-LD to be converted.
     * @param ontologyCache instance of `OntologyCache` to be used.
     * @param listNodeCache instance of ListNodeCache to be used.
     * @param jsonConvert jsonConvert the converter to be used.
     */
    const handleLinkValue = (valueJsonld: any, ontologyCache: OntologyCache, listNodeCache: ListNodeCache, jsonConvert: JsonConvert): Observable<ReadLinkValue> => {

        const linkValue = jsonConvert.deserialize(valueJsonld, ReadLinkValue) as ReadLinkValue;

        const handleLinkedResource =
            (linkedResource: { [index: string]: string | object[] }, incoming: boolean): Observable<ReadLinkValue> => {
                const referredRes: Observable<ReadResource> = createReadResource(linkedResource, ontologyCache, listNodeCache, jsonConvert);
                return referredRes.pipe(
                    map(
                        refRes => {
                            linkValue.linkedResource = refRes;
                            linkValue.linkedResourceIri = refRes.id;
                            linkValue.incoming = incoming;
                            return linkValue;
                        }
                    )
                );
            };

        const handleLinkedResourceIri = (linkedResourceIri: string, incoming: boolean): Observable<ReadLinkValue> => {
            if (linkedResourceIri === undefined) throw new Error("Invalid resource Iri");
            linkValue.linkedResourceIri = linkedResourceIri;
            linkValue.incoming = incoming;
            return of(linkValue);
        };

        // check if linked resource is nested or if just its IRI is present
        if (valueJsonld.hasOwnProperty(Constants.LinkValueHasTarget)) {
            return handleLinkedResource(valueJsonld[Constants.LinkValueHasTarget], false);
        } else if (valueJsonld.hasOwnProperty(Constants.LinkValueHasTargetIri)) {
            // TODO: check for existence of @id
            return handleLinkedResourceIri(valueJsonld[Constants.LinkValueHasTargetIri]["@id"], false);
        } else if (valueJsonld.hasOwnProperty(Constants.LinkValueHasSource)) {
            return handleLinkedResource(valueJsonld[Constants.LinkValueHasSource], true);
        } else if (valueJsonld.hasOwnProperty(Constants.LinkValueHasSourceIri)) {
            // TODO: check for existence of @id
            return handleLinkedResourceIri(valueJsonld[Constants.LinkValueHasSourceIri]["@id"], true);
        } else {
            throw new Error("Invalid Link Value");
        }

    };

    /**
     * Creates a single ReadValue.
     *
     * @param propIri Iri of the property pointing to the value.
     * @param valueJsonld JSON-LD object representing a single value.
     * @param entitiyDefs entity definitions for the given value type.
     * @param ontologyCache instance of OntologyCache to be used.
     * @param listNodeCache instance of ListNodeCache to be used.
     * @param jsonConvert instance of JsonConvert to be used.
     */
    const createValueValue = (propIri: string, valueJsonld: any, entitiyDefs: IResourceClassAndPropertyDefinitions, ontologyCache: OntologyCache, listNodeCache: ListNodeCache, jsonConvert: JsonConvert): Observable<ReadValue> => {

        if (Array.isArray(valueJsonld)) throw new Error("value is expected to be a single object");

        const type = valueJsonld["@type"];

        let value: Observable<ReadValue>;

        switch (type) {

            case Constants.BooleanValue: {
                value = handleSimpleValue(valueJsonld, ReadBooleanValue, jsonConvert);
                break;
            }

            case Constants.ColorValue: {
                value = handleSimpleValue(valueJsonld, ReadColorValue, jsonConvert);
                break;
            }

            case Constants.DateValue: {
                const dateVal = handleSimpleValue(valueJsonld, ParseReadDateValue, jsonConvert) as Observable<ParseReadDateValue>;
                value = dateVal.pipe(map(
                    date => {
                        return new ReadDateValue(date);
                    }
                ));
                break;
            }

            case Constants.IntValue: {
                value = handleSimpleValue(valueJsonld, ReadIntValue, jsonConvert);
                break;
            }

            case Constants.DecimalValue: {
                value = handleSimpleValue(valueJsonld, ReadDecimalValue, jsonConvert);
                break;
            }

            case Constants.IntervalValue: {
                value = handleSimpleValue(valueJsonld, ReadIntervalValue, jsonConvert);
                break;
            }

            case Constants.ListValue: {
                const listValue = value = handleSimpleValue(valueJsonld, ReadListValue, jsonConvert) as Observable<ReadListValue>;
                value = listValue.pipe(
                    mergeMap(
                        (listVal: ReadListValue) => {

                            // get referred list node's label
                            return listNodeCache.getNode(listVal.listNode).pipe(
                                map(
                                    listNode => {
                                        listVal.listNodeLabel = listNode.label;
                                        return listVal;
                                    })
                            );

                        }
                    )
                );
                break;
            }

            case Constants.UriValue: {
                value = handleSimpleValue(valueJsonld, ReadUriValue, jsonConvert);
                break;
            }

            case Constants.TextValue: {
                value = handleTextValue(valueJsonld, jsonConvert);
                break;
            }

            case Constants.LinkValue: {
                value = handleLinkValue(valueJsonld, ontologyCache, listNodeCache, jsonConvert);
                break;
            }

            case Constants.GeomValue: {
                const geomValue = handleSimpleValue(valueJsonld, ParseReadGeomValue, jsonConvert) as Observable<ParseReadGeomValue>;
                value = geomValue.pipe(map(
                    geom => {
                        return new ReadGeomValue(geom);
                    }
                ));
                break;
            }

            case Constants.StillImageFileValue: {
                value = handleSimpleValue(valueJsonld, ReadStillImageFileValue, jsonConvert);
                break;
            }

            default: {
                console.error("Unknown value type: ", type);
                value = of(jsonConvert.deserialize(valueJsonld, ReadValue) as ReadValue);
            }

        }

        return value.pipe(map(
            val => {
                val.property = propIri;
                val.propertyLabel = entitiyDefs.properties[propIri].label;
                val.propertyComment = entitiyDefs.properties[propIri].comment;

                return val;
            }
        ));

    };

    export const createCountQueryResponse = (countQueryResult: object, jsonConvert: JsonConvert): CountQueryResponse => {

        if (Array.isArray(countQueryResult)) throw new Error("countQueryResult is expected to be a single object");

        return jsonConvert.deserialize(countQueryResult, CountQueryResponse) as CountQueryResponse;

    };

}
