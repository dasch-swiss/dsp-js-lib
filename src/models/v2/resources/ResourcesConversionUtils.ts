import { JsonConvert } from "json2typescript";
import { forkJoin, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { OntologyCache } from "../../../index";
import { IResourceClassAndPropertyDefinitions } from "../../../cache/OntologyCache";
import { Constants } from "../Constants";
import { ResourcePropertyDefinition } from "../ontologies/resource-property-definition";
import { ReadResource } from "./read-resource";
import { ReadBooleanValue } from "./values/read-boolean-value";
import { ReadColorValue } from "./values/read-color-value";
import { ReadDateValue } from "./values/read-date-value";
import { ReadDecimalValue } from "./values/read-decimal-value";
import { ReadIntValue } from "./values/read-int-value";
import { ReadIntervalValue } from "./values/read-interval-value";
import { ReadLinkValue } from "./values/read-link-value";
import { ReadListValue } from "./values/read-list-value";
import { ReadTextValueAsHtml, ReadTextValueAsString, ReadTextValueAsXml } from "./values/read-text-value";
import { ReadUriValue } from "./values/read-uri-value";
import { ReadValue } from "./values/read-value";

export namespace ResourcesConversionUtils {

    export const parseResourceSequence = (resourcesJsonld: object, ontologyCache: OntologyCache, jsonConvert: JsonConvert): Observable<ReadResource[]> => {

        if (resourcesJsonld.hasOwnProperty("@graph")) {
            // sequence of resources
            return forkJoin((resourcesJsonld as { [index: string]: object[] })["@graph"]
                .map((res: { [index: string]: object[] | string }) => parseResource(res, ontologyCache, jsonConvert)));
        } else {
            //  one or no resource
            if (Object.keys(resourcesJsonld).length === 0) {
                return of([]);
            } else {
                return forkJoin([parseResource(resourcesJsonld as { [index: string]: object[] | string }, ontologyCache, jsonConvert)]);
            }
        }
    };

    const parseResource = (resourceJsonld: { [index: string]: string | object[] }, ontologyCache: OntologyCache, jsonConvert: JsonConvert): Observable<ReadResource> => {

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
                                values.push(parseValue(propIri, value, entitiyDefs, ontologyCache, jsonConvert));
                            }
                        } else {
                            values.push(parseValue(propIri, resourceJsonld[propIri], entitiyDefs, ontologyCache, jsonConvert));
                        }
                    });

                    return forkJoin(values).pipe(map(
                        vals => {
                            // vals.forEach(val => console.log(val));

                            // assign values
                            resource.properties = vals;

                            // console.log(resource)
                            return resource;
                        }
                    ));
                } else {
                    return of(resource);
                }

            }
        ));

    };

    const parseValue = (propIri: string, valueJsonld: any, entitiyDefs: IResourceClassAndPropertyDefinitions, ontologyCache: OntologyCache, jsonConvert: JsonConvert): Observable<ReadValue> => {

        if (Array.isArray(valueJsonld)) throw new Error("value is expected to be a single object");

        const type = valueJsonld["@type"];

        let value: Observable<ReadValue>;

        switch (type) {

            // TODO: GeomValue. FileValues

            case Constants.BooleanValue: {

                const boolVal: ReadBooleanValue = jsonConvert.deserialize(valueJsonld, ReadBooleanValue) as ReadBooleanValue;
                value = of(boolVal);
                break;
            }

            case Constants.ColorValue: {

                const colorVal: ReadColorValue = jsonConvert.deserialize(valueJsonld, ReadColorValue) as ReadColorValue;
                value = of(colorVal);
                break;
            }

            case Constants.DateValue: {

                const dateVal: ReadDateValue = jsonConvert.deserialize(valueJsonld, ReadDateValue) as ReadDateValue;
                dateVal["parseDate"]();
                value = of(dateVal);
                break;
            }

            case Constants.IntValue: {

                const intValue = jsonConvert.deserialize(valueJsonld, ReadIntValue) as ReadIntValue;
                value = of(intValue);
                break;
            }

            case Constants.DecimalValue: {

                const decValue = jsonConvert.deserialize(valueJsonld, ReadDecimalValue) as ReadDecimalValue;
                value = of(decValue);
                break;
            }

            case Constants.IntervalValue: {

                const intervalValue = jsonConvert.deserialize(valueJsonld, ReadIntervalValue) as ReadIntervalValue;
                value = of(intervalValue);
                break;
            }

            case Constants.ListValue: {

                const listValue = jsonConvert.deserialize(valueJsonld, ReadListValue) as ReadListValue;
                value = of(listValue);
                break;
            }

            case Constants.UriValue: {
                const uriValue = jsonConvert.deserialize(valueJsonld, ReadUriValue) as ReadUriValue;
                value = of(uriValue);

                break;
            }

            case Constants.TextValue: {

                if (valueJsonld.hasOwnProperty(Constants.ValueAsString)) {

                    // TODO: query standoff, if any.

                    const textValue =
                        jsonConvert.deserialize(valueJsonld, ReadTextValueAsString) as ReadTextValueAsString;
                    value = of(textValue);
                } else if (valueJsonld.hasOwnProperty(Constants.TextValueAsXml)) {
                    const textValue =
                        jsonConvert.deserialize(valueJsonld, ReadTextValueAsXml) as ReadTextValueAsXml;
                    value = of(textValue);
                } else if (valueJsonld.hasOwnProperty(Constants.TextValueAsHtml)) {
                    const textValue =
                        jsonConvert.deserialize(valueJsonld, ReadTextValueAsHtml) as ReadTextValueAsHtml;
                    value = of(textValue);
                } else {
                    throw new Error("Invalid Text value");
                }

                break;
            }

            case Constants.LinkValue: {
                const linkValue = jsonConvert.deserialize(valueJsonld, ReadLinkValue) as ReadLinkValue;

                const handleLinkedResource =
                    (linkedResource: { [index: string]: string | object[] }, incoming: boolean): Observable<ReadLinkValue> => {
                        const referredRes: Observable<ReadResource> = parseResource(linkedResource, ontologyCache, jsonConvert);
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
                    value = handleLinkedResource(valueJsonld[Constants.LinkValueHasTarget], false);
                } else if (valueJsonld.hasOwnProperty(Constants.LinkValueHasTargetIri)) {
                    // TODO: check for existence of @id
                    value = handleLinkedResourceIri(valueJsonld[Constants.LinkValueHasTargetIri]["@id"], false);
                } else if (valueJsonld.hasOwnProperty(Constants.LinkValueHasSource)) {
                    value = handleLinkedResource(valueJsonld[Constants.LinkValueHasSource], true);
                } else if (valueJsonld.hasOwnProperty(Constants.LinkValueHasSourceIri)) {
                    // TODO: check for existence of @id
                    value = handleLinkedResourceIri(valueJsonld[Constants.LinkValueHasSourceIri]["@id"], true);
                } else {
                    throw new Error("Invalid Link Value");
                }

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

}
