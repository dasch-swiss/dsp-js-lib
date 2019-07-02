import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";
import { UsersEndpoint } from "./users/users-endpoint";

/**
 * Defines the admin endpoint of the Knora API.
 */
export class AdminEndpoint extends Endpoint {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">

    static readonly PATH_USERS = "/users";

    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    readonly users: UsersEndpoint;

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">

    /**
     * Constructor.
     * Sets up all endpoints for this endpoint.
     * @param knoraApiConfig
     * @param path
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {

        super(knoraApiConfig, path);

        // Instantiate the endpoints
        this.users = new UsersEndpoint(knoraApiConfig, path + AdminEndpoint.PATH_USERS);
        // todo more

    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">
    // </editor-fold>

}
