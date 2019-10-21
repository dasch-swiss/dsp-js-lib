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

    /**
     * Given a sequence of resource IRIs, gets the resources from Knora.
     *
     * @param resourceIris Iris of the resources to get.
     * @param ontologyCache instance of `OntologyCache` to use.
     * @param listNodeCache instance of `ListNodeCache` to use.
     */
    getResources(resourceIris: string[], ontologyCache: OntologyCache, listNodeCache: ListNodeCache): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        // make URL containing resource Iris as segments
        const resIris: string = resourceIris.map((resIri: string) => {
            return "/" + encodeURIComponent(resIri);
        }).reduce((acc, currentValue) => {
            return acc + currentValue;
        });

        return this.httpGet(resIris).pipe(
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

    /**
     * Given a resource IRI, gets the resource from Knora.
     *
     * @param resourceIri Iri of the resource to get.
     * @param ontologyCache instance of `OntologyCache` to use.
     * @param listNodeCache instance of `ListNodeCache` to use.
     */
    getResource(resourceIri: string, ontologyCache: OntologyCache, listNodeCache: ListNodeCache): Observable<ReadResource | ApiResponseError> {
        return this.getResources([resourceIri], ontologyCache, listNodeCache).pipe(
            map((resources: ReadResource[]) => resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }
}
