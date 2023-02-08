/**
 * Configuration to instantiate a `KnoraApiConnection`.
 *
 * @category Config
 */
export class KnoraApiConfig {

    static readonly PROTOCOL_HTTP = "http";
    static readonly PROTOCOL_HTTPS = "https";

    static readonly DEFAULT_PORT_HTTP = 80;
    static readonly DEFAULT_PORT_HTTPS = 443;

    /**
     * The full API URL
     */
    get apiUrl(): string {
        return (
            (this.apiProtocol + "://" + this.apiHost) +
            (this.apiPort !== null ? ":" + this.apiPort : "") +
            this.apiPath
        );
    }

    /**
     * The full zio http API URL
     */
    get zioApiUrl(): string {
        return (
            (this.apiProtocol + "://" + this.apiHost) +
            this.zioPrefix +
            this.apiPath
        );
    }

    /**
     * List of endpoints using zio http
     */
    get zioEndpointsList(): string[] {
        return this.zioEndpoints;
    }

    /**
     * @param apiProtocol the protocol of the API (http or https)
     * @param apiHost the DSP-API base URL
     * @param apiPort the port of DSP-API
     * @param apiPath the base path following host and port, if any.
     * @param jsonWebToken token to identify the user
     * @param logErrors determines whether errors should be logged to the console
     * @param zioPrefix prefix for zio routes, ":5555" is used locally whereas "/zio" is used on servers
     * @param zioEndpoints list of zio endpoints
     */
    constructor(public apiProtocol: "http" | "https",
                public apiHost: string,
                public apiPort: number | null = null,
                public apiPath: string = "",
                public jsonWebToken: string = "",
                public logErrors: boolean = false,
                public zioPrefix: "/zio" | ":5555" = "/zio",
                public zioEndpoints: string[] = []
    ) {

        // Remove port in case it's the default one
        if (apiProtocol === KnoraApiConfig.PROTOCOL_HTTP && apiPort === KnoraApiConfig.DEFAULT_PORT_HTTP) {
            this.apiPort = null;
        } else if (apiProtocol === KnoraApiConfig.PROTOCOL_HTTPS && apiPort === KnoraApiConfig.DEFAULT_PORT_HTTPS) {
            this.apiPort = null;
        }

    }
}
