/**
 *
 */
import { AdminEndpoints } from "./api/admin-endpoints";

export class KnoraApiConnection {

    private _adminEndpoint: AdminEndpoints;

    get adminEndpoint(): AdminEndpoints {
        if (this._adminEndpoint instanceof AdminEndpoints === false) {
            this._adminEndpoint = new AdminEndpoints(this.baseUrl);
        }
        return this._adminEndpoint;
    }

    constructor(public readonly baseUrl: string) {

    }

}