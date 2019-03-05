import { AdminEndpoint } from "./api/admin-endpoint";
import { KnoraApiConfig } from "./knora-api-config";

/**
 * Offers methods for JavaScript developers to interact with the Knora API.
 */
export class KnoraApiConnection {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">
    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    public readonly admin: AdminEndpoint;

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">

    /**
     * Constructor.
     * Sets up all endpoints for the Knora API.
     * @param knoraApiConfig
     */
    constructor(knoraApiConfig: KnoraApiConfig) {

        // Instantiate the endpoints
        this.admin = new AdminEndpoint(knoraApiConfig, "/admin");
        // todo more

    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">
    // </editor-fold>

}