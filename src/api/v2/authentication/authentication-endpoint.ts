import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { LoginResponse } from "../../../models/v2/authentication/login-response";
import { LogoutResponse } from "../../../models/v2/authentication/logout-response";
import { Endpoint } from "../../endpoint";

/**
 * Handles requests to the authentication route of the Knora API.
 */
export class AuthenticationEndpoint extends Endpoint {

    /**
     *  Logs in a user.
     *
     * @param username the given username.
     * @param password the user's password.
     */
    login(username: string, password: string): Observable<ApiResponseData<LoginResponse> | ApiResponseError> {

        return this.httpPost("", {
            password,
            username
        }).pipe(
            map((ajaxResponse: AjaxResponse) => {
                // Make sure the web token is stored.
                const responseData = ApiResponseData.fromAjaxResponse(ajaxResponse, LoginResponse, this.jsonConvert);
                this.jsonWebToken = responseData.body.token;
                return responseData;
            }),
            catchError(error => this.handleError(error))
        );

    }

    /**
     *  Logs out the user and destroys the session on the server- and client-side.
     */
    logout(): Observable<ApiResponseData<LogoutResponse> | ApiResponseError> {

        return this.httpDelete("").pipe(
            map((ajaxResponse: AjaxResponse) => {
                // Make sure the web token is removed.
                const responseData = ApiResponseData.fromAjaxResponse(ajaxResponse, LogoutResponse, this.jsonConvert);
                this.jsonWebToken = "";
                return responseData;
            }),
            catchError(error => this.handleError(error))
        );

    }

}
