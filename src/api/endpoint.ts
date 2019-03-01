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
    constructor(protected readonly baseUrl: string) {
        this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
    }

    /**
     * Performs a general GET request.
     *
     * @param path the URL for the GET request.
     * @param params the parameters for the GET request.
     * @returns
     */
    httpGet(path: string, params?: any): Observable<any> {

        return ajax.get(path).pipe(
            map((response: AjaxResponse): any => {

                console.log("lol");

                console.log(response);

                if (response.status >= 400) {
                    throwError(response);
                }

                return response.response;

            }),
            catchError((error: AjaxError) => {
                console.log("doh!");
                console.log(error);
                return this.handlePrimaryRequestError(error);
            })
        );

    }

    httpPost(path: string, params?: any): Observable<any> {
        return ajax.post(path);
    }

    /**
     * handle request error in case of server error
     *
     * @param error
     * @returns
     */
    protected handlePrimaryRequestError(error: any): Observable<AjaxError> {

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