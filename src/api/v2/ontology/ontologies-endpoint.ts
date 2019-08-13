import {OperationMode} from "json2typescript";
import {Observable} from 'rxjs';
import {AjaxResponse} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiResponseData, ApiResponseError, LoginResponse} from '../../..';
import {OntologyV2} from '../../../models/v2/ontologies/ontology-v2';
import {ResourceClass} from "../../../models/v2/ontologies/resource-class";
import {Endpoint} from '../../endpoint';
import {Constants} from '../../../models/v2/Constants';
import {ResourcePropertyClass, SystemPropertyClass} from '../../../models/v2/ontologies/property-class';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld/dist/jsonld.js');

export class OntologiesEndpoint extends Endpoint {

    getOntologies(ontologyIris: string[]) {

    }

    getOntology(ontologyIri: string): Observable<OntologyV2 | ApiResponseError> {

        return this.httpGet('/allentities/' + encodeURIComponent(ontologyIri)).pipe(
                mergeMap((ajaxResponse: AjaxResponse) => {
                    // console.log(JSON.stringify(ajaxResponse.response));
                    return jsonld.compact(ajaxResponse.response, {});
                }), map((jsonldobj: object) => {
                    // console.log(JSON.stringify(jsonldobj));
                    const responseData = this.convertOntology(jsonldobj, ontologyIri);

                    return responseData;
                }),
                catchError(error => {
                    console.error(error);
                    return this.handleError(error);
                })
        );
    }

    private convertOntology(ontologyJsonld: object, ontologyIri: string): OntologyV2 {

        const onto = new OntologyV2(ontologyIri);

        const entities = (ontologyJsonld as {[index: string]: object[]})['@graph'];

        // this.jsonConvert.operationMode = OperationMode.LOGGING;

        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsResourceClass) &&
                entity[Constants.IsResourceClass] === true;
        }).map(resclassJsonld => {
            return this.jsonConvert.deserializeObject(resclassJsonld, ResourceClass);
        }).forEach((resClass: ResourceClass) => {
            onto.resourceClasses[resClass.id] = resClass;
        });

        entities.filter((entity: any) => {
            return entity.hasOwnProperty(Constants.IsResourceProperty) &&
                entity[Constants.IsResourceProperty] === true;
        }).map((propertyJsonld: any) => {
            return this.jsonConvert.deserializeObject(propertyJsonld, ResourcePropertyClass);
        }).forEach((prop: ResourcePropertyClass) => {
            onto.properties[prop.id] = prop;
        });

        entities.filter((entity: any) => {
            return (entity["@type"] === Constants.DataTypeProperty || entity["@type"] === Constants.DataTypeProperty)
                    && !entity.hasOwnProperty(Constants.IsResourceProperty);
        }).map((propertyJsonld: any) => {
            return this.jsonConvert.deserializeObject(propertyJsonld, SystemPropertyClass);
        }).forEach((prop: SystemPropertyClass) => {
            onto.properties[prop.id] = prop;
        });


        // console.log(JSON.stringify(onto.properties));

        return onto;
    }
}
