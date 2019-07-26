import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {PropertyMatchingRule} from 'json2typescript/src/json2typescript/json-convert-enums';
import {Observable, throwError} from 'rxjs';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {AjaxError} from 'rxjs/internal/observable/dom/AjaxObservable';

import {KnoraApiConfig} from '../knora-api-config';
import {ApiResponseError} from '../models/api-response-error';
import {DataError} from '../models/data-error';

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
    set jsonWebToken(value: string) {
        this.knoraApiConfig.jsonWebToken = value;
    }

    /**
     * The session token
     */
    get jsonWebToken(): string {
        return this.knoraApiConfig.jsonWebToken;
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
     */
    protected httpGet(path?: string): Observable<AjaxResponse> {

        if (path === undefined) path = '';

        return ajax.get(this.knoraApiConfig.apiUrl + this.path + path, this.constructHeader(false));

    }

    /**
     * Performs a general POST request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     */
    protected httpPost(path?: string, body?: any): Observable<AjaxResponse> {

        if (path === undefined) path = '';

        return ajax.post(this.knoraApiConfig.apiUrl + this.path + path, body, this.constructHeader(true));

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     */
    protected httpPut(path?: string, body?: any): Observable<AjaxResponse> {

        if (path === undefined) path = '';

        return ajax.put(this.knoraApiConfig.apiUrl + this.path + path, body, this.constructHeader(true));

    }

    /**
     * Performs a general PATCH request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     */
    protected httpPatch(path?: string, body?: any): Observable<AjaxResponse> {

        if (path === undefined) path = '';

        return ajax.patch(this.knoraApiConfig.apiUrl + this.path + path, body, this.constructHeader(true));

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request
     */
    protected httpDelete(path?: string): Observable<AjaxResponse> {

        if (path === undefined) path = '';

        return ajax.delete(this.knoraApiConfig.apiUrl + this.path + path, this.constructHeader(false));

    }

    /**
     * Handles parsing errors.
     * @param error the error class provided by us
     */
    protected handleError(error: AjaxError | DataError): Observable<ApiResponseError> {

        let responseError: ApiResponseError;

        // Check the type of error and save it to the responseError
        if (error instanceof DataError) {

            responseError = error.response;

            if (this.knoraApiConfig.logErrors) {
                console.error('Parse Error in Knora API request: ' + responseError.error);
            }

        } else {

            responseError = ApiResponseError.fromAjaxError(error);

            if (this.knoraApiConfig.logErrors) {
                console.error('Ajax Error in Knora API request: ' + responseError.method + ' ' + responseError.url);
            }

        }

        return throwError(responseError);

    }

    /**
     * Creates a header for a HTTP request.
     * If the client has obtained a token, it is included.
     *
     * @param setContentTypeJson if true, sets the content type to application/json
     */
    private constructHeader(setContentTypeJson: boolean = true): object {

        const header: {[key: string]: string} = {};

        if (this.jsonWebToken !== "") {
            header['Authorization'] = 'Bearer ' + this.jsonWebToken;
        }

        if (setContentTypeJson) {
            header['Content-Type'] = 'application/json';
        }

        return header;
    }

}
