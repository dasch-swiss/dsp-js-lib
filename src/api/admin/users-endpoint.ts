import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../../classes/admin/user";
import { UserList } from "../../classes/admin/user-list";
import { AjaxError } from "rxjs/ajax";
import { Endpoint } from "../endpoint";

export class UsersEndpoint extends Endpoint {

    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAllUsers(): Observable<UserList | AjaxError> {

        return this.httpGet(this.baseUrl + "/admin/users").pipe(
            map((result: any) => this.jsonConvert.deserializeObject<UserList>(result, UserList)),
            catchError(this.handlePrimaryRequestError)
        );

    }

}