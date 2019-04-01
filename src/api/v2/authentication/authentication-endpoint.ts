import { Observable } from "rxjs";
import { AjaxError } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../../endpoint";

export class AuthenticationEndpoint extends Endpoint {

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

    // <editor-fold desc="">

    /**
     * Logs in a user.
     */
    login(username: string, password: string): Observable<string | AjaxError> {

        return this.httpPost("", {
            username: username,
            password: password
        }).pipe(
            map((result: any): string => {
                const token: string | undefined = result["token"];
                if (token) {
                    this.jsonWebToken = token;
                    return token;
                } else {
                    throw Error("Invalid JSON returned, no token available");
                }
            }),
            catchError(this.handlePrimaryRequestError)
        );

    }

    /**
     * Logs out the user and destroys the session server- and client-side.
     */
    logout(): Observable<any | AjaxError> {
        this.jsonWebToken = "";
        return this.httpDelete("");
    }

    // </editor-fold>

}