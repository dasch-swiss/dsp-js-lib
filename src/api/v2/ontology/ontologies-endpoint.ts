import {Observable} from "rxjs";
import {AjaxResponse} from "rxjs/ajax";
import {catchError, map} from "rxjs/operators";
import {ApiResponseData, ApiResponseError, LoginResponse} from "../../..";
import {OntologyV2} from "../../../models/v2/ontologies/ontology-v2";
import {Endpoint} from "../../endpoint";

export class OntologiesEndpoint extends Endpoint {

    getOntologies(ontologyIris: string[]) {

    }

    getOntology(ontologyIri: string): Observable<OntologyV2 | ApiResponseError> {
        return this.httpGet("/allentities/" + encodeURIComponent(ontologyIri)).pipe(
            map((ajaxResponse: AjaxResponse) => {
                const responseData = this.convertOntology(ajaxResponse);

                return responseData;
            }),
            catchError(error => this.handleError(error))
        );
    }

    private convertOntology(ontologyJsonld: object): OntologyV2 {
        return new OntologyV2("iri");
    }
}
