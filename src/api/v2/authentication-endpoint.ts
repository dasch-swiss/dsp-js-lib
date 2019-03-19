import { Endpoint } from "../endpoint";
import { Observable } from "rxjs";
import { UserList } from "../../classes/admin";
import { AjaxError } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";

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
     *
     * @returns Observable<User[]>
     */
    login(): Observable<UserList | AjaxError> {
        throw new Error("Not implemented");
    }

    /**
     * Logs out the user and destroys the session server- and client-side.
     */
    logout() {
        throw new Error("Not implemented");
    }

    // </editor-fold>

}