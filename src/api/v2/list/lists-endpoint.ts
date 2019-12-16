import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { ListNodeV2 } from "../../../models/v2/lists/list-node-v2";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the lists route of the Knora API.
 */
export class ListsEndpoint extends Endpoint {

    /**
     * Get a specific list node.
     *
     * @param nodeIri the Ir of the list node to be fetched.
     */
    getNode(nodeIri: string): Observable<ListNodeV2 | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/node/" + encodeURIComponent(nodeIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(
                res => {
                    return this.jsonConvert.deserialize(res, ListNodeV2) as ListNodeV2;
                }
            ),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Get an entire list.
     *
     * @param rootNodeIri the list's root node Iri.
     */
    getList(rootNodeIri: string): Observable<ListNodeV2 | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/lists/" + encodeURIComponent(rootNodeIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(
                res => {
                    return this.jsonConvert.deserialize(res, ListNodeV2) as ListNodeV2;
                }
            ),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

}
