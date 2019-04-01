/**
 * Contains the configuration that can be used in the KnoraApiConnection.
 */
export class KnoraApiConfig {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">

    private static readonly DEFAULT_PORT = 80;
    private static readonly DEFAULT_PATH = "";

    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    /**
     * The full API URL
     */
    get apiUrl(): string {
        return this.apiProtocol + "://" + this.apiHost + ":" + this.apiPort + this.apiPath
    }

    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">

    /**
     * Constructor.
     * @param apiProtocol the protocol of the API (http/https)
     * @param apiHost the API base URL
     * @param apiPort the port of the Knora API
     * @param apiPath the base path following
     * @param jsonWebToken token to identify the user
     */
    constructor(public apiProtocol: "http" | "https",
                public apiHost: string,
                public apiPort: number = KnoraApiConfig.DEFAULT_PORT,
                public apiPath: string = KnoraApiConfig.DEFAULT_PATH,
                public jsonWebToken: string = "") {
    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">
    // </editor-fold>

}