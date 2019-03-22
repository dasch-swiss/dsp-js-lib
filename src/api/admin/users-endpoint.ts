import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../../models/admin/user";
import { UserList } from "../../models/admin/user-list";
import { AjaxError } from "rxjs/ajax";
import { Endpoint } from "../endpoint";
import { IUsersEndpoint, IUsersEndpointUrl } from "../../interfaces/api/admin/i-users-endpoint";

export class UsersEndpoint extends Endpoint implements IUsersEndpoint  {

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

        const url = IUsersEndpointUrl.get(arguments.callee.name);
        console.log(url);

        if (!url) return this.handlePrimaryRequestError(undefined);

        return this.httpGet(url).pipe(
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
