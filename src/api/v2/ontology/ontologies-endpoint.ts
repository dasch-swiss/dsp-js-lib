import {Observable} from 'rxjs';
import {AjaxResponse} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiResponseData, ApiResponseError, LoginResponse} from '../../..';
import {OntologyV2} from '../../../models/v2/ontologies/ontology-v2';
import {Endpoint} from '../../endpoint';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld/dist/jsonld.js');

export class OntologiesEndpoint extends Endpoint {

    getOntologies(ontologyIris: string[]) {

    }

    getOntology(ontologyIri: string): Observable<OntologyV2 | ApiResponseError> {
        return this.httpGet('/allentities/' + encodeURIComponent(ontologyIri)).pipe(
                mergeMap((ajaxResponse: AjaxResponse) => {
                    console.log(JSON.stringify(ajaxResponse.response));
                    return jsonld.compact(ajaxResponse.response, {});
                }), map((jsonldobj: object) => {
                    console.log(JSON.stringify(jsonldobj));
                    const responseData = this.convertOntology(jsonldobj);

                    return responseData;
                }),
                catchError(error => this.handleError(error))
        );
    }

    private convertOntology(ontologyJsonld: object): OntologyV2 {
        return new OntologyV2('iri');
    }
}
