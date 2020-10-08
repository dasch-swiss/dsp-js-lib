import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";
import { HealthEndpointSystem } from "./health/health-endpoint-system";

/**
 * A client API for administering Knora.
 */
export class SystemEndpoint extends Endpoint {

    /**
     * An endpoint for knora system health.
     */
    readonly healthEndpoint: HealthEndpointSystem;

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

        this.healthEndpoint = new HealthEndpointSystem(knoraApiConfig, path + "/health");
    }
}
