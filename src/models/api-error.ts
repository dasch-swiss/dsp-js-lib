import { ajax, AjaxError } from "rxjs/ajax";

/**
 * Object to be returned in case an API request fails.
 */
export class ApiError {

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
     * Detailed AjaxError, if applicable
     */
    ajaxError: AjaxError | null = null;

    /**
     * Original HTTP method
     */
    method: string = "";

    /**
     * Request URL
     */
    url: string = "";

    /**
     * Status number
     */
    status: number = 0;

    /**
     * Status text
     */
    statusText: string = "";

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">

    /**
     * Create an instance from an AjaxError.
     * @param ajaxError
     */
    static fromAjaxError(ajaxError: AjaxError): ApiError {

        const apiError = new ApiError();
        apiError.ajaxError = ajaxError;
        if (ajaxError.request.method) apiError.method = ajaxError.request.method;
        if (ajaxError.request.url) apiError.url = ajaxError.request.url;
        apiError.status = ajaxError.xhr.status;
        apiError.statusText = ajaxError.xhr.statusText;

        return apiError;

    }

    // </editor-fold>

}