import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../../models/api-response-error";
import { KnoraApiConfig } from "../../../knora-api-config";
import { CreateResource } from "../../../models/v2/resources/create/create-resource";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { ResourcesConversionUtil } from "../../../models/v2/resources/ResourcesConversionUtil";
import { Endpoint } from "../../endpoint";
import { V2Endpoint } from "../v2-endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the resources route of the Knora API.
 */
export class ResourcesEndpoint extends Endpoint {

    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string, private readonly v2Endpoint: V2Endpoint) {
        super(knoraApiConfig, path);
    }

    /**
     * Given a sequence of resource IRIs, gets the resources from Knora.
     *
     * @param resourceIris Iris of the resources to get.
     */
    getResources(resourceIris: string[]): Observable<ReadResource[] | ApiResponseError> {
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
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, this.v2Endpoint.ontologyCache, this.v2Endpoint.listNodeCache, this.jsonConvert);
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
     */
    getResource(resourceIri: string): Observable<ReadResource | ApiResponseError> {
        return this.getResources([resourceIri]).pipe(
            map((resources: ReadResource[]) => resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    createResource(resource: CreateResource): Observable<ReadResource | ApiResponseError> {

        const res = this.jsonConvert.serializeObject(resource);

        // iterate over properties and serialize them
        const keys = Object.keys(resource.properties);

        keys.forEach(prop => {
                res[prop] = this.jsonConvert.serializeArray(resource.properties[prop]);
        });

        return this.httpPost("", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, this.v2Endpoint.ontologyCache, this.v2Endpoint.listNodeCache, this.jsonConvert);
            }),
            map((resources: ReadResource[]) => resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );

    }
}
