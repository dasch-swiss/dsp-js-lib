/**
 *
 */
import { AdminEndpoints } from "./api/admin-endpoints";

export class KnoraApiConnection {

    private _admin: AdminEndpoints;

    get admin(): AdminEndpoints {
        if (this._admin instanceof AdminEndpoints === false) {
            this._admin = new AdminEndpoints(this.baseUrl);
        }
        return this._admin;
    }

    constructor(public readonly baseUrl: string) {

    }

}