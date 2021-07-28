import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Observable, throwError } from "rxjs";
import { ajax, AjaxError, AjaxRequest, AjaxResponse } from "rxjs/ajax";
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
    [index: string]: string | boolean;
}

/**
 * @category Internal
 */
export class Endpoint {

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

    /**
     * Constructor.
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {
    }

    /**
     * Performs a general GET request.
     *
     * @param path the relative URL for the request
     * @param headerOpts additional headers, if any.
     */
    protected httpGet(path?: string, headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        const header = this.constructHeader(undefined, headerOpts);

        const ar = this.setAjaxRequest(this.knoraApiConfig.apiUrl + this.path + path, "GET", undefined, header);


        // return ajax.get(this.knoraApiConfig.apiUrl + this.path + path, this.constructHeader(undefined, headerOpts))
        return ajax(ar)
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

        const header = this.constructHeader(contentType, headerOpts);

        const ar = this.setAjaxRequest(this.knoraApiConfig.apiUrl + this.path + path, "POST", body, header);

        return ajax(ar)
            .pipe(
                retryOnError(this.delay, this.maxRetries, this.retryOnErrorStatus, this.knoraApiConfig.logErrors)
            );

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

        const header = this.constructHeader(contentType, headerOpts);

        const ar = this.setAjaxRequest(this.knoraApiConfig.apiUrl + this.path + path, "PUT", body, header);

        return ajax(ar)
            .pipe(
                retryOnError(this.delay, this.maxRetries, this.retryOnErrorStatus, this.knoraApiConfig.logErrors)
            );

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

        const header = this.constructHeader(contentType, headerOpts);

        const ar = this.setAjaxRequest(this.knoraApiConfig.apiUrl + this.path + path, "PATCH", body, header);

        return ajax(ar)
            .pipe(
                retryOnError(this.delay, this.maxRetries, this.retryOnErrorStatus, this.knoraApiConfig.logErrors)
            );

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request.
     * @param headerOpts additional headers, if any.
     */
    protected httpDelete(path?: string, headerOpts?: IHeaderOptions): Observable<AjaxResponse> {

        if (path === undefined) path = "";

        const header = this.constructHeader(undefined, headerOpts);

        const ar = this.setAjaxRequest(this.knoraApiConfig.apiUrl + this.path + path, "DELETE", undefined, header);

        return ajax(ar)
            .pipe(
                retryOnError(this.delay, this.maxRetries, this.retryOnErrorStatus, this.knoraApiConfig.logErrors)
            );

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
    private constructHeader(contentType?: "json" | "sparql", headerOpts?: IHeaderOptions): IHeaderOptions {

        const header: IHeaderOptions = {};

        if (this.jsonWebToken !== "") {
            // I think this is not needed anymore because with the `withCredentials = true` the cookie will always be sent with each request
            // header["Authorization"] = "Bearer " + this.jsonWebToken;
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

    /**
     * Sets ajax request
     * @param url string
     * @param method 'GET', 'POST', 'PUT', 'PATCH' or 'DELETE'
     * @param [body] any
     * @param [headers] IHeaderOptions
     * @returns AjaxRequest object
     */
    private setAjaxRequest(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", body?: any, headers?: IHeaderOptions): AjaxRequest {

        let ajaxRequest: AjaxRequest = {
            url: url,
            method: method,
            body: body,
            async: true,
            withCredentials: true,
            headers: headers
        };

        return ajaxRequest;
    }

}
