/**
 *
 */
import { UsersEndpoint } from "./admin/users-endpoint";

export class AdminEndpoints {

    private _users: UsersEndpoint;

    get users(): UsersEndpoint {
        if (this._users instanceof UsersEndpoint === false) {
            this._users = new UsersEndpoint(this.baseUrl);
        }
        return this._users;
    }


    constructor(public readonly baseUrl: string) {

    }

}