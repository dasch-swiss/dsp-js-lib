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
import {ReadBooleanValue} from '../../../models/v2/resources/read-boolean-value';

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
            readResources =  (resourcesJsonld as { [index: string]: object[] })['graph']
                    .map((res: {[index: string]: object[] | string}) => this.parseResource(res, ontologyCache));
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

        // determine resource class
        const resourceType = resourceJsonld['@type'] as string;

        return ontologyCache.getResourceClass(resourceType).pipe(mergeMap(
                resClass => {

                    const resourceProps: string[] = Object.keys(resourceJsonld)
                            .filter((propIri: string) => {
                        return resClass.properties[propIri] instanceof ResourcePropertyDefinition;
                    });

                    let values: any[] = [];

                    resourceProps.forEach((propIri: string) => {
                        values = values.concat(this.parseValue(propIri, resourceJsonld[propIri]));
                    });

                    return forkJoin(values).pipe(map(
                            vals => {
                                const resource = new ReadResource(resClass.classes[resourceType].label as string);
                                resource.properties = vals;
                                return resource;
                            }
                    ));

                }
        ));

    }

    private parseValue(propIri: string, valueJsonld: any): Array<Observable<any>> {
        const type = valueJsonld['@type'];

        let value: Array<Observable<any>> = [];

        switch (type) {

            case Constants.BooleanValue: {
                const boolVal = this.jsonConvert.deserialize(valueJsonld, ReadBooleanValue);
                value = value.concat(of(boolVal));
                break;
            }

            default: {
                value = value.concat(of(false));
                break;
            }

        }

        return value;
    }

}
