import {OperationMode} from "json2typescript";
import {Observable} from 'rxjs';
import {AjaxResponse} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiResponseData, ApiResponseError, LoginResponse} from '../../..';
import {OntologyV2} from '../../../models/v2/ontologies/ontology-v2';
import {ResourceClass} from "../../../models/v2/ontologies/resource-class";
import {Endpoint} from '../../endpoint';

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
                    const responseData = this.convertOntology(jsonldobj);

                    return responseData;
                }),
                catchError(error => this.handleError(error))
        );
    }

    private convertOntology(ontologyJsonld: object): OntologyV2 {

        const onto = new OntologyV2('iri');

        // TODO: use json2Typescript
        const entities = (ontologyJsonld as {[index: string]: object[]})['@graph'];
        this.jsonConvert.operationMode = OperationMode.LOGGING;
        const resclasses = (entities).filter((entity: any) => {
            return entity.hasOwnProperty("http://api.knora.org/ontology/knora-api/v2#isResourceClass") &&
                entity["http://api.knora.org/ontology/knora-api/v2#isResourceClass"] === true;
        }).map(resclass => {
            const r = this.jsonConvert.deserializeObject(resclass, ResourceClass);
            return r;
        });

        const properties = (entities).filter((entity: any) => {
            return entity.hasOwnProperty("http://api.knora.org/ontology/knora-api/v2#isResourceProperty") &&
                entity["http://api.knora.org/ontology/knora-api/v2#isResourceProperty"] === true;
        });

        console.log(JSON.stringify(resclasses[0]));

        return onto;
    }
}
