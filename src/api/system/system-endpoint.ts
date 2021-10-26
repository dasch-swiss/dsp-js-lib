import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";
import { HealthEndpointSystem } from "./health/health-endpoint-system";
import { VersionEndpointSystem } from "./version/version-endpoint-system";

/**
 * A client API for administering Knora.
 *
 * @category Endpoint System
 */
export class SystemEndpoint extends Endpoint {

    static readonly PATH_HEALTH = "/health";
    static readonly PATH_VERSION = "/version";

    /**
     * An endpoint for DSP system health.
     */
    readonly healthEndpoint: HealthEndpointSystem;

    /**
     * An endpoint for DSP version.
     */
    readonly versionEndpoint: VersionEndpointSystem;

    /**
     * Constructor.
     * Sets up all endpoints for this endpoint.
     *
     * @param knoraApiConfig
     * @param path
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {

        super(knoraApiConfig, path);

        // Instantiate the endpoints
        this.healthEndpoint = new HealthEndpointSystem(knoraApiConfig, path + SystemEndpoint.PATH_HEALTH);
        this.versionEndpoint = new VersionEndpointSystem(knoraApiConfig, path + SystemEndpoint.PATH_VERSION);
    }
}
