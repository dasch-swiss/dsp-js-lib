import { AjaxResponse } from "rxjs/ajax";
import { catchError, mergeMap } from "rxjs/operators";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

export class ListsEndpoint extends Endpoint {

    getNode(nodeIri: string) {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/node/" + encodeURIComponent(nodeIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    getList(rootNodeIri: string) {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/lists/" + encodeURIComponent(rootNodeIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

}
