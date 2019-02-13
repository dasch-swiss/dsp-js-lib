/**
 *
 */
import { UsersEndpoint } from "./admin/users-endpoint";

export class AdminEndpoints {

    private _usersEndpoint: UsersEndpoint;

    get usersEndpoint(): UsersEndpoint {
        if (this._usersEndpoint instanceof UsersEndpoint === false) {
            this._usersEndpoint = new UsersEndpoint(this.baseUrl);
        }
        return this._usersEndpoint;
    }


    constructor(public readonly baseUrl: string) {

    }

}