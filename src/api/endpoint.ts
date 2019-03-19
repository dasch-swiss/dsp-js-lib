import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AjaxError } from "rxjs/internal/observable/dom/AjaxObservable";

import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";

import { KnoraApiConfig } from "../knora-api-config";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";

export class Endpoint {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">

    protected readonly URL: any = {
        ADMIN_USERS_GET: "/admin/users"
    };

    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    public jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">

    /**
     * Constructor.
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {}

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
    protected httpGet(path: string): Observable<any> {

        return ajax.get(this.knoraApiConfig.apiUrl + this.path + path).pipe(
            map((response: AjaxResponse): any => {
                return response.response;
            }),
            catchError((error: AjaxError) => {
                return this.handlePrimaryRequestError(error);
            })
        );

    }

    /**
     * Performs a general POST request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     */
    protected httpPost(path: string, body?: any): Observable<any> {

        return ajax.post(this.knoraApiConfig.apiUrl + this.path + path, body).pipe(
            map((response: AjaxResponse): any => {
                return response.response;
            }),
            catchError((error: AjaxError) => {
                return this.handlePrimaryRequestError(error);
            })
        );

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     */
    protected httpPut(path: string, body?: any): Observable<any> {

        return ajax.put(this.knoraApiConfig.apiUrl + this.path + path, body).pipe(
            map((response: AjaxResponse): any => {
                return response.response;
            }),
            catchError((error: AjaxError) => {
                return this.handlePrimaryRequestError(error);
            })
        );

    }

    /**
     * Performs a general PATCH request.
     *
     * @param path the relative URL for the request
     * @param body the body of the request
     */
    protected httpPatch(path: string, body?: any): Observable<any> {

        return ajax.patch(this.knoraApiConfig.apiUrl + this.path + path, body).pipe(
            map((response: AjaxResponse): any => {
                return response.response;
            }),
            catchError((error: AjaxError) => {
                return this.handlePrimaryRequestError(error);
            })
        );

    }

    /**
     * Performs a general PUT request.
     *
     * @param path the relative URL for the request
     */
    protected httpDelete(path: string): Observable<any> {

        return ajax.delete(this.knoraApiConfig.apiUrl + this.path + path).pipe(
            map((response: AjaxResponse): any => {
                return response.response;
            }),
            catchError((error: AjaxError) => {
                return this.handlePrimaryRequestError(error);
            })
        );

    }

    /**
     * handle request error in case of server error
     *
     * @param error
     * @returns
     */
    protected handlePrimaryRequestError(error: any): Observable<AjaxError> {

        console.error(error);

        /*
        // console.error(error);
        const serviceError = new ApiServiceError();
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);*/
        return throwError(error);

    }

}