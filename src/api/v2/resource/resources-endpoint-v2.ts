import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "../../../knora-api-config";
import { ApiResponseError } from "../../../models/api-response-error";
import { CreateResource } from "../../../models/v2/resources/create/create-resource";
import { DeleteResource } from "../../../models/v2/resources/delete/delete-resource";
import { DeleteResourceResponse } from "../../../models/v2/resources/delete/delete-resource-response";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { ReadResourceSequence } from "../../../models/v2/resources/read/read-resource-sequence";
import { ResourcesConversionUtil } from "../../../models/v2/resources/ResourcesConversionUtil";
import { UpdateResourceMetadata } from "../../../models/v2/resources/update/update-resource-metadata";
import { UpdateResourceMetadataResponse } from "../../../models/v2/resources/update/update-resource-metadata-response";
import { Endpoint } from "../../endpoint";
import { V2Endpoint } from "../v2-endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the resources route of the Knora API.
 */
export class ResourcesEndpointV2 extends Endpoint {

    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string, private readonly v2Endpoint: V2Endpoint) {
        super(knoraApiConfig, path);
    }

    /**
     * Given a sequence of resource IRIs, gets the resources from Knora.
     *
     * @param resourceIris Iris of the resources to get.
     */
    getResources(resourceIris: string[]): Observable<ReadResourceSequence | ApiResponseError> {
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
            map((resources: ReadResourceSequence) => resources.resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Creates a new resource.
     *
     * @param resource the resource to be created.
     */
    createResource(resource: CreateResource): Observable<ReadResource | ApiResponseError> {

        const res = this.jsonConvert.serializeObject(resource);

        // get property Iris
        const propIris = Object.keys(resource.properties);

        // for each property, serialize its values
        // and assign them to the resource
        propIris.forEach(propIri => {

            // check that array contains least one value
            if (resource.properties[propIri].length === 0) {
                throw new Error("No values defined for " + propIri);
            }

            // if array contains only one element, serialize as an object
            if (resource.properties[propIri].length === 1) {
                res[propIri] = this.jsonConvert.serializeObject(resource.properties[propIri][0]);
            } else {
                res[propIri] = this.jsonConvert.serializeArray(resource.properties[propIri]);
            }

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
            map((resources: ReadResourceSequence) => resources.resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );

    }

    /**
     * Updates a resource's metadata.
     *
     * @param resourceMetadata the new metadata.
     */
    updateResourceMetadata(resourceMetadata: UpdateResourceMetadata): Observable<UpdateResourceMetadataResponse | ApiResponseError> {

        // check that at least one of the following properties is updated: label, hasPermissions, newModificationDateDate
        if (resourceMetadata.label === undefined && resourceMetadata.hasPermissions === undefined && resourceMetadata.newModificationDateDate === undefined) {
            throw new Error("At least one of the following properties has to be updated: label, hasPermissions, newModificationDateDate");
        }

        const res = this.jsonConvert.serializeObject(resourceMetadata);

        return this.httpPut("", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, UpdateResourceMetadataResponse);
            }),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Deletes a resource.
     *
     * @param resource the resource to be deleted.
     */
    deleteResource(resource: DeleteResource): Observable<DeleteResourceResponse | ApiResponseError> {

        const res = this.jsonConvert.serializeObject(resource);

        return this.httpPost("/delete", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, DeleteResourceResponse);
            }),
            catchError(error => this.handleError(error))
        );


    }
}
