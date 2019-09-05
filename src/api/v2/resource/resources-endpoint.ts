import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, mergeMap } from "rxjs/operators";
import { ApiResponseError, OntologyCache } from "../../..";
import { ResourceConversionUtils } from "../../../models/v2/ResourceConversionUtils";
import { ReadResource } from "../../../models/v2/resources/read-resource";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

export class ResourcesEndpoint extends Endpoint {

    getResource(resourceIri: string, ontologyCache: OntologyCache): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("/" + encodeURIComponent(resourceIri)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourceConversionUtils.parseResourceSequence(jsonldobj, ontologyCache, this.jsonConvert);
            }),
            catchError(error => {
                console.error(error);
                return this.handleError(error);
            })
        );
    }
}
