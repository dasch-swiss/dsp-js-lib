import { JsonConvert } from "json2typescript";
import { AjaxResponse } from "rxjs/ajax";

import { ApiResponse } from "./api-response";
import { ApiResponseError } from "./api-response-error";
import { DataError } from "./data-error";

/**
 * @category Response
 */
export class ApiResponseData<T> extends ApiResponse {

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
     * The returned data from the body
     */
    body: T;

    /**
     * Detailed AjaxResponse, if applicable
     */
    response: AjaxResponse;

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
     * Create an instance from an AjaxResponse.
     * If the return type in the body shall be checked, this method requires the arguments dataType and jsonConvert.
     * @throws DataError
     */
    static fromAjaxResponse<T>(ajaxResponse: AjaxResponse,
                               dataType?: { new(): T },
                               jsonConvert?: JsonConvert): ApiResponseData<T> {

        const responseData = new ApiResponseData<T>();

        responseData.response = ajaxResponse;
        if (ajaxResponse.request && ajaxResponse.request.method) responseData.method = ajaxResponse.request.method;
        if (ajaxResponse.request && ajaxResponse.request.url) responseData.url = ajaxResponse.request.url;
        if (ajaxResponse.xhr) responseData.status = ajaxResponse.xhr.status;

        // Apply json2typescript if required
        responseData.body = ajaxResponse.response;
        if (dataType && jsonConvert) {
            try {
                responseData.body = jsonConvert.deserializeObject(ajaxResponse.response, dataType);
            } catch (error) {
                const responseError = ApiResponseError.fromErrorString(error, responseData);
                throw new DataError(error, responseError);
            }
        }

        return responseData;

    }

    // </editor-fold>

}
