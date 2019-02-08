import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../endpoint";
import { User } from "../../classes/admin/user";

export class Users extends Endpoint{

    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAllUsers(): Observable<any> {

        return this.httpGet('/admin/users').pipe(
            map((result: any) => result),
            catchError(this.handlePrimaryRequestError)
        );
        
    }

}