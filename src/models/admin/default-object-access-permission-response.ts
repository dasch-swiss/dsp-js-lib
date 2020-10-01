import { JsonObject, JsonProperty } from "json2typescript";
import { AdministrativePermission } from "./administrative-permission";

/**
 * Represents a project's default object access permissions.
 */
@JsonObject("DefaultObjectAccessPermissionResponse")
export class DefaultObjectAccessPermissionResponse {

    /**
     * The permissions belonging to a project.
     */
    @JsonProperty("default_object_access_permission", AdministrativePermission)
    defaultObjectAccessPermission: AdministrativePermission = new AdministrativePermission();

}
