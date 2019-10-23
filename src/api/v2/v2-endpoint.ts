import { OntologyCache } from "../..";
import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";
import { AuthenticationEndpoint } from "./authentication/authentication-endpoint";
import { ListsEndpoint } from "./list/lists-endpoint";
import { OntologiesEndpoint } from "./ontology/ontologies-endpoint";
import { ResourcesEndpoint } from "./resource/resources-endpoint";
import { SearchEndpoint } from "./search/search-endpoint";

/**
 * Defines the V2 endpoint of the Knora API.
 */
export class V2Endpoint extends Endpoint {

    static readonly PATH_AUTHENTICATION = "/authentication";

    static readonly PATH_ONTOLOGIES = "/ontologies";

    static readonly PATH_RESOURCES = "/resources";

    readonly auth: AuthenticationEndpoint;

    readonly onto: OntologiesEndpoint;

    readonly res: ResourcesEndpoint;

    readonly list: ListsEndpoint;

    readonly search: SearchEndpoint;

    readonly ontologyCache: OntologyCache;

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
        this.onto = new OntologiesEndpoint(knoraApiConfig, path + V2Endpoint.PATH_ONTOLOGIES);
        this.res = new ResourcesEndpoint(knoraApiConfig, path + V2Endpoint.PATH_RESOURCES, this);
        this.list = new ListsEndpoint(knoraApiConfig, path);
        this.search = new SearchEndpoint(knoraApiConfig, path, this);

        // Instantiate caches
        this.ontologyCache = new OntologyCache(knoraApiConfig, this);
    }

}
