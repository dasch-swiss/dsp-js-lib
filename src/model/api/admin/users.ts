import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Endpoint } from "../endpoint";

export class Users extends Endpoint{

    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAllUsers(): Observable<any[]> {

        return this.httpGet("");


        /*return this.httpGet('/admin/users').pipe(
            map((result: ApiServiceResult) => result.getBody(UsersResponse).users),
            catchError(this.handleJsonError)
        );*/
    }

}