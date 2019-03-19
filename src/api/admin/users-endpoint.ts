import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../../classes/admin/user";
import { UserList } from "../../classes/admin/user-list";
import { AjaxError } from "rxjs/ajax";
import { Endpoint } from "../endpoint";

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

    // <editor-fold desc="">

    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAll(): Observable<UserList | AjaxError> {

        return this.httpGet("").pipe(
            map((result: UserList) => {
                return this.jsonConvert.deserializeObject<UserList>(result, UserList)
            }),
            catchError(
                this.handlePrimaryRequestError
            )
        );

    }

    // </editor-fold>

}
