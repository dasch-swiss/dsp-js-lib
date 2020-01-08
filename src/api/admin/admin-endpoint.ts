import { KnoraApiConfig } from "../../knora-api-config";
import { Endpoint } from "../endpoint";

import { UsersEndpoint } from "./users/users-endpoint";
import { GroupsEndpoint } from "./groups/groups-endpoint";
import { ProjectsEndpoint } from "./projects/projects-endpoint";
import { PermissionsEndpoint } from "./permissions/permissions-endpoint";
import { ListsEndpoint } from "./lists/lists-endpoint";


/**
 * A client API for administering Knora.
 */
export class AdminEndpoint extends Endpoint {
    
    /**
     * An endpoint for working with Knora users.
     */
    readonly usersEndpoint: UsersEndpoint;
    
    /**
     * An endpoint for working with Knora groups.
     */
    readonly groupsEndpoint: GroupsEndpoint;
    
    /**
     * An endpoint for working with Knora projects.
     */
    readonly projectsEndpoint: ProjectsEndpoint;
    
    /**
     * An endpoint for working with Knora permissions.
     */
    readonly permissionsEndpoint: PermissionsEndpoint;
    
    /**
     * An endpoint for working with Knora lists.
     */
    readonly listsEndpoint: ListsEndpoint;
    

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
        
        this.usersEndpoint = new UsersEndpoint(knoraApiConfig, path + "/users");
        this.groupsEndpoint = new GroupsEndpoint(knoraApiConfig, path + "/groups");
        this.projectsEndpoint = new ProjectsEndpoint(knoraApiConfig, path + "/projects");
        this.permissionsEndpoint = new PermissionsEndpoint(knoraApiConfig, path + "/permissions");
        this.listsEndpoint = new ListsEndpoint(knoraApiConfig, path + "/lists");
    }
}
