import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { CredentialsResponse } from "../../../models/v2/authentication/credentials-response";
import { LoginResponse } from "../../../models/v2/authentication/login-response";
import { LogoutResponse } from "../../../models/v2/authentication/logout-response";
import { Endpoint } from "../../endpoint";

/**
 * Handles requests to the authentication route of the Knora API.
 *
 * @category Endpoint
 */
export class AuthenticationEndpointV2 extends Endpoint {

    /**
     *  Logs in a user.
     *
     * @param property The name of the property by which the user is identified.
     * @param id the given user.
     * @param password the user's password.
     */
    login(property: "iri" | "email" | "username", id: string, password: string): Observable<ApiResponseData<LoginResponse> | ApiResponseError> {

        const credentials: any = {
            password
        };

        credentials[property] = id;

        return this.httpPost("", credentials).pipe(
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

    /**
     * Checks credentials.
     *
     * Returns a `ApiResponseError` if the client is not authorized.
     */
    checkCredentials(): Observable<ApiResponseData<CredentialsResponse> | ApiResponseError> {

        return this.httpGet("").pipe(
            map((ajaxResponse: AjaxResponse) => {
                return ApiResponseData.fromAjaxResponse(ajaxResponse, CredentialsResponse);
            }),
            catchError(error => this.handleError(error))
        );
    }

}
