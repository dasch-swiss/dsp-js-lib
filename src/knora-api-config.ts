/**
 * Contains the configuration that can be used in the KnoraApiConnection.
 */
export class KnoraApiConfig {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">

    static readonly PROTOCOL_HTTP = "http";
    static readonly PROTOCOL_HTTPS = "https";

    static readonly DEFAULT_PORT_HTTP = 80;
    static readonly DEFAULT_PORT_HTTPS = 443;

    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">

    /**
     * The full API URL
     */
    get apiUrl(): string {
        return (
            ( this.apiProtocol + "://" + this.apiHost ) +
            ( this.apiPort !== null ? ":" + this.apiPort : "" ) +
            this.apiPath
        );
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
     * @param logErrors determines whether errors should be logged to the console
     */
    constructor(public apiProtocol: "http" | "https",
                public apiHost: string,
                public apiPort: number | null = null,
                public apiPath: string = "",
                public jsonWebToken: string = "",
                public logErrors: boolean = false) {

        // Remove port in case it's the default one
        if (apiProtocol === KnoraApiConfig.PROTOCOL_HTTP && apiPort === KnoraApiConfig.DEFAULT_PORT_HTTP) {
            this.apiPort = null;
        } else if (apiProtocol === KnoraApiConfig.PROTOCOL_HTTPS && apiPort === KnoraApiConfig.DEFAULT_PORT_HTTPS) {
            this.apiPort = null;
        }

    }

    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">
    // </editor-fold>

}
