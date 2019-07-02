import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";
import { AuthenticationEndpoint } from "./authentication/authentication-endpoint";

/**
 * Defines the V2 endpoint of the Knora API.
 */
export class V2Endpoint extends Endpoint {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">

    static readonly PATH_AUTHENTICATION = "/authentication";

    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    readonly auth: AuthenticationEndpoint;

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
        this.auth = new AuthenticationEndpoint(knoraApiConfig, path + V2Endpoint.PATH_AUTHENTICATION);
        // todo more

    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">
    // </editor-fold>

}
