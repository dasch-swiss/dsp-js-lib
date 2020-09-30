import { JsonObject, JsonProperty } from "json2typescript";
import { CreatePermission } from "./create-permission";

/**
 * Creation of an administrative permission.
 */
@JsonObject("CreateAdministrativePermission")
export class CreateAdministrativePermission {

    /**
     * The permissions id, if provided.
     */
    @JsonProperty("id", String, true)
    id?: string;

    /**
     * The group that the permission applies to.
     */
    @JsonProperty("forGroup", String, true)
    forGroup?: string = undefined;

    /**
     * The project that the permission applies to.
     */
    @JsonProperty("forProject", String, true)
    forProject?: string = undefined;

    /**
     * The permissions granted by an AdministrativePermission.
     */
    @JsonProperty("hasPermissions", [CreatePermission])
    hasPermissions: CreatePermission[] = [];

}
