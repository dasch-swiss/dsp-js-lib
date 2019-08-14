import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../../../models/admin/user";
import { UserResponse } from "../../../models/admin/user-response";
import { UsersResponse } from "../../../models/admin/users-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

/**
 * Defines the user endpoint of the Knora API.
 */
export class UsersEndpoint extends Endpoint {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">
    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="GET">

    /**
     * Returns a list of all users.
     */
    getUsers(): Observable<ApiResponseData<UsersResponse> | ApiResponseError> {

        return this.httpGet().pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, UsersResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Gets a user by a property.
     */
    getUser(property: "iri" | "email" | "username",
            value: string): Observable<ApiResponseData<UserResponse> | ApiResponseError> {

        let userId = value;

        if (property === "iri") userId = encodeURIComponent(userId);

        return this.httpGet("/" + property + "/" + userId).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, UserResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Gets a user by its IRI.
     */
    getUserByIri(iri: string): Observable<ApiResponseData<UserResponse> | ApiResponseError> {
        return this.getUser("iri", iri);
    }

    /**
     * Gets a user by its e-mail.
     */
    getUserByEmail(email: string): Observable<ApiResponseData<UserResponse> | ApiResponseError> {
        return this.getUser("email", email);
    }

    /**
     * Gets a user by its username.
     */
    getUserByUsername(username: string): Observable<ApiResponseData<UserResponse> | ApiResponseError> {
        return this.getUser("username", username);
    }

    // </editor-fold>

    // <editor-fold desc="POST">

    /**
     * Creates a user.
     */
    createUser(user: User): Observable<ApiResponseData<UserResponse> | ApiResponseError> {

        return this.httpPost("", user).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, UserResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    // </editor-fold>

    // <editor-fold desc="PUT">

    /**
     * Updates a user.
     */
    updateUser(user: User): Observable<ApiResponseData<UserResponse> | ApiResponseError> {

        return this.httpPut("", user).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, UserResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Updates a user.
     */
    updateUserStatus(user: User): Observable<ApiResponseData<UserResponse> | ApiResponseError> {

        return this.httpPut("/iri/" + encodeURI(user.id) + "/Status", {
            status: user.status
        }).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, UserResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Updates only the password of a user.
     */
    updateUserPassword(user: User,
                       oldPassword: string,
                       newPassword: string): Observable<ApiResponseData<UserResponse> | ApiResponseError> {

        return this.httpPut("/iri/" + encodeURI(user.id) + "/Password", {
            requesterPassword: oldPassword,
            newPassword: newPassword
        }).pipe(
            map(ajaxResponse => {
                // Make sure the user instance is updated
                const responseData = ApiResponseData.fromAjaxResponse(ajaxResponse, UserResponse, this.jsonConvert);
                responseData.body.user.password = newPassword;
                return responseData;
            }),
            catchError(error => this.handleError(error))
        );

    }

    // </editor-fold>

    // <editor-fold desc="DELETE">

    /**
     * Deletes a user.
     * This method does not actually delete a user, but sets the status to false.
     */
    deleteUser(user: User): Observable<ApiResponseData<UserResponse> | ApiResponseError> {
        user.status = false;
        return this.updateUserStatus(user);
    }

    // </editor-fold>

}
