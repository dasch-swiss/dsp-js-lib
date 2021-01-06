import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Observable, of, throwError } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";

import { KnoraApiConfig } from "../knora-api-config";
import { ApiResponseError } from "../models/api-response-error";
import { DataError } from "../models/data-error";
import { retryOnError } from "./operators/retryOnError";

/**
 * HTTP Headers to be sent with the request.
 *
 * Note that Authorization and Content-Type are handled
 * by the method `constructHeader`.
 *
 * @category Internal
 */
export interface IHeaderOptions {
    [index: string]: string;
}

/**
 * @category Internal
 */
export class Endpoint {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">
    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    readonly maxRetries = 5;

    readonly delay = 500;

    readonly retryOnErrorStatus = [0, 500];

    /**
     * JsonConvert instance
     */
    jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    /**
     * The session token
     */
    get jsonWebToken(): string {
        return this.knoraApiConfig.jsonWebToken;
    }

    /**
     * The session token
     */
    set jsonWebToken(value: string) {
        this.knoraApiConfig.jsonWebToken = value;
    }

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">

    /**
     * Constructor.
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {
    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">
    // </editor-fold>

    /**
     * Performs a general GET request.
     *
     * @param path the relative URL for the request
     * @param headerOpts additional headers, if any.
     */
    protected httpGet(path?: string, headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        return ajax.get(this.knoraApiConfig.apiUrl + this.path + path, this.constructHeader(undefined, headerOpts))
            .pipe(
                retryOnError(this.delay, this.maxRetries, this.retryOnErrorStatus, this.knoraApiConfig.logErrors)
            );

    }

    /**
     * Performs a general POST request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request, if any.
     * @param contentType content content type of body, if any.
     * @param headerOpts additional headers, if any.
     */
    protected httpPost(path?: string, body?: any, contentType: "json" | "sparql" = "json", headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        return ajax.post(this.knoraApiConfig.apiUrl + this.path + path, body, this.constructHeader(contentType, headerOpts));

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     * @param contentType content content type of body, if any.
     * @param headerOpts additional headers, if any.
     */
    protected httpPut(path?: string, body?: any, contentType: "json" = "json", headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        return ajax.put(this.knoraApiConfig.apiUrl + this.path + path, body, this.constructHeader(contentType, headerOpts));

    }

    /**
     * Performs a general PATCH request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     * @param contentType content content type of body, if any.
     * @param headerOpts additional headers, if any.
     */
    protected httpPatch(path?: string, body?: any, contentType: "json" = "json", headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        return ajax.patch(this.knoraApiConfig.apiUrl + this.path + path, body, this.constructHeader(contentType, headerOpts));

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request.
     * @param headerOpts additional headers, if any.
     */
    protected httpDelete(path?: string, headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        return ajax.delete(this.knoraApiConfig.apiUrl + this.path + path, this.constructHeader(undefined, headerOpts));

    }

    /**
     * Handles parsing errors.
     * @param error the error class provided by us
     */
    protected handleError(error: AjaxError | DataError): Observable<ApiResponseError> {

        let responseError: ApiResponseError;

        if (this.knoraApiConfig.logErrors) {
            console.error(error);
        }

        // Check the type of error and save it to the responseError
        if (error instanceof DataError) {

            responseError = error.response;

            if (this.knoraApiConfig.logErrors) {
                console.error("Parse Error in Knora API request: " + responseError.error);
            }

        } else {

            responseError = ApiResponseError.fromAjaxError(error);

            if (this.knoraApiConfig.logErrors) {
                console.error("Ajax Error in Knora API request: " + responseError.method + " " + responseError.url);
            }

        }

        return throwError(responseError);

    }

    /**
     * Creates a header for a HTTP request.
     * If the client has obtained a token, it is included.
     *
     * @param contentType Sets the content type, if any.
     * @param headerOpts additional headers, if any.
     */
    private constructHeader(contentType?: "json" | "sparql", headerOpts?: IHeaderOptions): object {

        const header: IHeaderOptions = {};

        if (this.jsonWebToken !== "") {
            header["Authorization"] = "Bearer " + this.jsonWebToken;
        }

        if (contentType !== undefined) {
            if (contentType === "json") {
                header["Content-Type"] = "application/json; charset=utf-8";
            } else if (contentType === "sparql") {
                header["Content-Type"] = "application/sparql-query; charset=utf-8";
            }
        }

        if (headerOpts !== undefined) {
            const headerProps = Object.keys(headerOpts);
            headerProps.forEach(
                prop => {
                    header[prop] = headerOpts[prop];
                }
            );
        }

        return header;
    }

}
