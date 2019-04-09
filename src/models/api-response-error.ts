import { AjaxError } from "rxjs/ajax";

import { ApiResponse } from "./api-response";
import { ApiResponseData } from "./api-response-data";

export class ApiResponseError extends ApiResponse {

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
     * Detailed error, if applicable
     */
    error: AjaxError | string = "";

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">

    /**
     * Constructor.
     */
    private constructor() {
        super();
    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">

    /**
     * Create an instance from an AjaxError.
     */
    static fromAjaxError(ajaxError: AjaxError): ApiResponseError {

        const response = new ApiResponseError();

        if (ajaxError.request.method) response.method = ajaxError.request.method;
        if (ajaxError.request.url) response.url = ajaxError.request.url;
        if (ajaxError.xhr) response.status = ajaxError.xhr.status;

        response.error = ajaxError;

        return response;

    }

    /**
     * Create an instance from an error string.
     * @param responseData
     * @param error
     */
    static fromErrorString(error: string, responseData: ApiResponseData<any>): ApiResponseError {

        const response = new ApiResponseError();

        response.method = responseData.method;
        response.url = responseData.url;
        response.status = responseData.status;

        response.error = error;

        return response;

    }

    // </editor-fold>

}