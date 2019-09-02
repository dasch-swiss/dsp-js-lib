import {Endpoint} from '../../endpoint';
import {ApiResponseError, OntologyCache} from '../../..';
import {ReadResource} from '../../../models/v2/resources/read-resource';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AjaxResponse} from 'rxjs/ajax';
import {forkJoin, Observable, of} from 'rxjs';
import {ReadOntology} from '../../../models/v2/ontologies/read-ontology';
import {PropertyDefinition} from '../../../models/v2/ontologies/property-definition';
import {ResourcePropertyDefinition} from '../../../models/v2/ontologies/resource-property-definition';
import {Constants} from '../../../models/v2/Constants';
import {ReadBooleanValue} from '../../../models/v2/resources/values/read-boolean-value';
import {ReadValue} from '../../../models/v2/resources/values/read-value';
import {IEntityDefinitions} from '../../../cache/OntologyCache';
import {ReadColorValue} from '../../../models/v2/resources/values/read-color-value';
import {ReadDateValue} from '../../../models/v2/resources/values/read-date-value';
import {ReadIntValue} from '../../../models/v2/resources/values/read-int-value';
import {ReadDecimalValue} from '../../../models/v2/resources/values/read-decimal-value';
import {ReadIntervalValue} from '../../../models/v2/resources/values/read-interval-value';
import {ReadListValue} from '../../../models/v2/resources/values/read-list-value';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld/dist/jsonld.js');

export class ResourcesEndpoint extends Endpoint {

    getResource(resourceIri: string, ontologyCache: OntologyCache): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet('/' + encodeURIComponent(resourceIri)).pipe(
                mergeMap((ajaxResponse: AjaxResponse) => {
                    // console.log(JSON.stringify(ajaxResponse.response));
                    // TODO: @rosenth Adapt context object
                    // TODO: adapt getOntologyIriFromEntityIri
                    return jsonld.compact(ajaxResponse.response, {});
                }), mergeMap((jsonldobj: object) => {
                    // console.log(JSON.stringify(jsonldobj));
                    return this.parseResourceSequence(jsonldobj, ontologyCache);
                }),
                catchError(error => {
                    console.error(error);
                    return this.handleError(error);
                })
        );
    }

    private parseResourceSequence(resourcesJsonld: object, ontologyCache: OntologyCache): Observable<ReadResource[]> {

        let readResources: Array<Observable<ReadResource>>;

        if (resourcesJsonld.hasOwnProperty('@graph')) {
            // sequence of resources
            readResources = (resourcesJsonld as { [index: string]: object[] })['graph']
                    .map((res: { [index: string]: object[] | string }) => this.parseResource(res, ontologyCache));
        } else {
            //  one or no resource
            if (Object.keys(resourcesJsonld).length === 0) {
                readResources = [];
            } else {
                readResources = [this.parseResource(resourcesJsonld as { [index: string]: object[] | string }, ontologyCache)];
            }
        }

        return forkJoin(readResources);
    }

    private parseResource(resourceJsonld: { [index: string]: string | object[] }, ontologyCache: OntologyCache): Observable<ReadResource> {

        if (Array.isArray(resourceJsonld)) throw new Error('resource is expected to be a single object');

        // determine resource class
        const resourceType = resourceJsonld['@type'] as string;

        return ontologyCache.getResourceClass(resourceType).pipe(mergeMap(
                (entitiyDefs: IEntityDefinitions) => {

                    const resourceProps: string[] = Object.keys(resourceJsonld)
                            .filter((propIri: string) => {
                                return entitiyDefs.properties[propIri] instanceof ResourcePropertyDefinition;
                            });

                    const values: Array<Observable<ReadValue>> = [];

                    resourceProps.forEach((propIri: string) => {

                        if (Array.isArray(resourceJsonld[propIri])) {
                            for (const value of resourceJsonld[propIri]) {
                                values.push(this.parseValue(propIri, value, entitiyDefs));
                            }
                        } else {
                            values.push(this.parseValue(propIri, resourceJsonld[propIri], entitiyDefs));
                        }
                    });

                    return forkJoin(values).pipe(map(
                            vals => {
                                // vals.forEach(val => console.log(val));

                                const resource = this.jsonConvert.deserialize(resourceJsonld, ReadResource) as ReadResource;

                                // assign values
                                resource.properties = vals;

                                // add information from ontology
                                resource.resourceClassLabel = entitiyDefs.classes[resourceType].label;
                                resource.resourceClassComment = entitiyDefs.classes[resourceType].comment;

                                // console.log(resource)
                                return resource;
                            }
                    ));

                }
        ));

    }

    private parseValue(propIri: string, valueJsonld: any, entitiyDefs: IEntityDefinitions): Observable<ReadValue> {

        if (Array.isArray(valueJsonld)) throw new Error('value is expected to be a single object');

        const type = valueJsonld['@type'];

        let value: Observable<ReadValue>;

        switch (type) {

            case Constants.BooleanValue: {

                const boolVal: ReadBooleanValue = this.jsonConvert.deserialize(valueJsonld, ReadBooleanValue) as ReadBooleanValue;
                value = of(boolVal);
                break;
            }

            case Constants.ColorValue: {

                const colorVal: ReadColorValue = this.jsonConvert.deserialize(valueJsonld, ReadColorValue) as ReadColorValue;
                value = of(colorVal);
                break;
            }

            case Constants.DateValue: {

                const dateVal: ReadDateValue = this.jsonConvert.deserialize(valueJsonld, ReadDateValue) as ReadDateValue;
                dateVal['parseDate']();
                value = of(dateVal);
                break;
            }

            case Constants.IntValue: {

                const intValue = this.jsonConvert.deserialize(valueJsonld, ReadIntValue) as ReadIntValue;
                value = of(intValue);
                break;
            }

            case Constants.DecimalValue: {

                const decValue = this.jsonConvert.deserialize(valueJsonld, ReadDecimalValue) as ReadDecimalValue;
                value = of(decValue);
                break;
            }

            case Constants.IntervalValue: {

                const intervalValue = this.jsonConvert.deserialize(valueJsonld, ReadIntervalValue) as ReadIntervalValue;
                value = of(intervalValue);
                break;
            }

            case Constants.ListValue: {

                const listValue = this.jsonConvert.deserialize(valueJsonld, ReadListValue) as ReadListValue;
                value = of(listValue);
                break;
            }

            default: {
                console.error('Unknown value type: ', type);
                value = of(this.jsonConvert.deserialize(valueJsonld, ReadValue) as ReadValue);
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

    }

}
