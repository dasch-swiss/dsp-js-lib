import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "../../../knora-api-config";
import { ApiResponseError } from "../../../models/api-response-error";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { ResourcesConversionUtil } from "../../../models/v2/resources/ResourcesConversionUtil";
import { UpdateResource } from "../../../models/v2/resources/update/update-resource";
import { CreateFileValue } from "../../../models/v2/resources/values/create/create-file-value";
import { CreateValue } from "../../../models/v2/resources/values/create/create-value";
import { DeleteValue } from "../../../models/v2/resources/values/delete/delete-value";
import { DeleteValueResponse } from "../../../models/v2/resources/values/delete/delete-value-response";
import { UpdateValue } from "../../../models/v2/resources/values/update/update-value";
import { WriteValueResponse } from "../../../models/v2/resources/values/write-value-response";
import { Endpoint } from "../../endpoint";
import { V2Endpoint } from "../v2-endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the values route of the Knora API.
 */
export class ValuesEndpoint extends Endpoint {

    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string, private readonly v2Endpoint: V2Endpoint) {
        super(knoraApiConfig, path);
    }

    /**
     * Reads a value from Knora.
     *
     * @param resourceIri the Iri of the resource the value belongs to.
     * @param valueUuid the value's UUID.
     */
    getValue(resourceIri: string, valueUuid: string): Observable<ReadResource | ApiResponseError> {
        return this.httpGet("/" + encodeURIComponent(resourceIri) + "/" + encodeURIComponent(valueUuid)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, this.v2Endpoint.ontologyCache, this.v2Endpoint.listNodeCache, this.jsonConvert);
            }),
            map(resources => resources[0]),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Updates an existing value.
     *
     * @param resource The resource with the value to be updated.
     */
    updateValue(resource: UpdateResource<UpdateValue>): Observable<WriteValueResponse | ApiResponseError> {

        const res = this.jsonConvert.serializeObject<UpdateResource<UpdateValue>>(resource);

        const val = this.jsonConvert.serializeObject<UpdateValue>(resource.value);

        res[resource.property] = val;

        return this.httpPut("", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, WriteValueResponse);
            }),
            catchError(error => this.handleError(error))
        );
    }

    /**
     * Creates a new value.
     *
     * @param resource The resource with the value to be created.
     */
    createValue(resource: UpdateResource<CreateValue>): Observable<WriteValueResponse | ApiResponseError> {

        const res = this.jsonConvert.serializeObject<UpdateResource<CreateValue>>(resource);

        if (resource.value instanceof CreateFileValue) {
            throw Error("A value of type CreateFileValue can only be created with a new resource");
        }

        const val = this.jsonConvert.serializeObject<CreateValue>(resource.value);

        res[resource.property] = val;

        return this.httpPost("", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, WriteValueResponse);
            }),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Deletes a value.
     *
     * @param resource The resource with the value to be deleted.
     */
    deleteValue(resource: UpdateResource<DeleteValue>): Observable<DeleteValueResponse | ApiResponseError> {

        const res = this.jsonConvert.serializeObject<UpdateResource<DeleteValue>>(resource);

        const val = this.jsonConvert.serializeObject<DeleteValue>(resource.value);

        res[resource.property] = val;

        return this.httpPost("/delete", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, DeleteValueResponse);
            }),
            catchError(error => this.handleError(error))
        );

    }
}
