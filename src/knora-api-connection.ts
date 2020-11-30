import { AdminEndpoint } from "./api/admin/admin-endpoint";
import { SystemEndpoint } from "./api/system/system-endpoint";
import { V2Endpoint } from "./api/v2/v2-endpoint";
import { KnoraApiConfig } from "./knora-api-config";

/**
 * Offers methods for JavaScript developers to interact with the Knora API.
 *
 * @category Config
 */
export class KnoraApiConnection {

    static readonly PATH_SYSTEM = "";
    static readonly PATH_ADMIN = "/admin";
    static readonly PATH_V2 = "/v2";

    /**
     * Holds all endpoints of the system
     */
    readonly system: SystemEndpoint;

    /**
     * Holds all endpoints of the admin route
     */
    readonly admin: AdminEndpoint;

    /**
     * Holds all endpoints of the v2 route
     */
    readonly v2: V2Endpoint;

    /**
     * Constructor.
     * Sets up all endpoints for the Knora API.
     * @param knoraApiConfig
     */
    constructor(knoraApiConfig: KnoraApiConfig) {

        // Instantiate the endpoints
        this.system = new SystemEndpoint(knoraApiConfig, KnoraApiConnection.PATH_SYSTEM);
        this.admin = new AdminEndpoint(knoraApiConfig, KnoraApiConnection.PATH_ADMIN);
        this.v2 = new V2Endpoint(knoraApiConfig, KnoraApiConnection.PATH_V2);
        // todo more

    }
}
