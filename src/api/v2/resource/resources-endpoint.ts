import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError, ListNodeCache, OntologyCache } from "../../..";
import { ReadResource } from "../../../models/v2/resources/read-resource";
import { ResourcesConversionUtil } from "../../../models/v2/resources/ResourcesConversionUtil";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

export class ResourcesEndpoint extends Endpoint {

    getResources(resourceIri: string[], ontologyCache: OntologyCache, listNodeCache: ListNodeCache): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        // TODO: submit several Resource Iris separated by a slash
        return this.httpGet("/" + encodeURIComponent(resourceIri[0])).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, ontologyCache, listNodeCache, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    getResource(resourceIri: string, ontologyCache: OntologyCache, listNodeCache: ListNodeCache): Observable<ReadResource | ApiResponseError> {
        return this.getResources([resourceIri], ontologyCache, listNodeCache).pipe(
            map((resources: ReadResource[]) => resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }
}
