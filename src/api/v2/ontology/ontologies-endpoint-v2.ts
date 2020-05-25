import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { OntologiesMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { OntologyConversionUtil } from "../../../models/v2/ontologies/OntologyConversionUtil";
import { ReadOntology } from "../../../models/v2/ontologies/read-ontology";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the ontologies route of the Knora API.
 */
export class OntologiesEndpointV2 extends Endpoint {

    /**
     * Requests metadata about all ontologies from Knora.
     */
    getOntologiesMetadata(): Observable<OntologiesMetadata | ApiResponseError> {

        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/metadata").pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return this.jsonConvert.deserializeObject(jsonldobj, OntologiesMetadata);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Requests an ontology from Knora and converts it to a `ReadOntology`.
     *
     * @param ontologyIri the IRI of the ontology to be requested.
     * @return the ontology or an error.
     */
    getOntology(ontologyIri: string): Observable<ReadOntology | ApiResponseError> {

        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/allentities/" + encodeURIComponent(ontologyIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return OntologyConversionUtil.convertOntology(jsonldobj, this.jsonConvert, this.knoraApiConfig);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    getOntologiesByProjectIri(projectIri: string): Observable<OntologiesMetadata | ApiResponseError> {

        return this.httpGet("/metadata/" + encodeURIComponent(projectIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                return this.jsonConvert.deserializeObject(jsonldobj, OntologiesMetadata);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

}
