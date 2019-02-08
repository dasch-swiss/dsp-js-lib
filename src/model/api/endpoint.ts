import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AjaxError } from "rxjs/internal/observable/dom/AjaxObservable";

import { JsonConvert, ValueCheckingMode } from "json2typescript";

export class Endpoint {

    public jsonConvert: JsonConvert = new JsonConvert();

    /**
     * Constructor.
     */
    constructor() {
        this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    }

    /**
     * Performs a general GET request.
     *
     * @param path the URL for the GET request.
     * @param params the parameters for the GET request.
     * @returns
     */
    httpGet(path: string, params?: any): Observable<any> {

        return ajax.get(path, { observe: 'response', params: params }).pipe(
            map((response: AjaxResponse): AjaxResponse => {
                /*
                const result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;*/

                return response;

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
    protected handlePrimaryRequestError(error: AjaxError): Observable<AjaxError> {
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