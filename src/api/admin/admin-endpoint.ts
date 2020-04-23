import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";

import { UsersEndpointAdmin } from "./users/users-endpoint-admin";
import { GroupsEndpointAdmin } from "./groups/groups-endpoint-admin";
import { ProjectsEndpointAdmin } from "./projects/projects-endpoint-admin";
import { PermissionsEndpointAdmin } from "./permissions/permissions-endpoint-admin";
import { ListsEndpointAdmin } from "./lists/lists-endpoint-admin";


/**
 * A client API for administering Knora.
 */
export class AdminEndpoint extends Endpoint {
    
    /**
     * An endpoint for working with Knora users.
     */
    readonly usersEndpoint: UsersEndpointAdmin;
    
    /**
     * An endpoint for working with Knora groups.
     */
    readonly groupsEndpoint: GroupsEndpointAdmin;
    
    /**
     * An endpoint for working with Knora projects.
     */
    readonly projectsEndpoint: ProjectsEndpointAdmin;
    
    /**
     * An endpoint for working with Knora permissions.
     */
    readonly permissionsEndpoint: PermissionsEndpointAdmin;
    
    /**
     * An endpoint for working with Knora lists.
     */
    readonly listsEndpoint: ListsEndpointAdmin;
    

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
        
        this.usersEndpoint = new UsersEndpointAdmin(knoraApiConfig, path + "/users");
        this.groupsEndpoint = new GroupsEndpointAdmin(knoraApiConfig, path + "/groups");
        this.projectsEndpoint = new ProjectsEndpointAdmin(knoraApiConfig, path + "/projects");
        this.permissionsEndpoint = new PermissionsEndpointAdmin(knoraApiConfig, path + "/permissions");
        this.listsEndpoint = new ListsEndpointAdmin(knoraApiConfig, path + "/lists");
    }
}
