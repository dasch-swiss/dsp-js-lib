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
    @JsonProperty("forGroup")
    forGroup: string | null = null;

    /**
     * The project that the permission applies to.
     */
    @JsonProperty("forProject", String)
    forProject: string = "";

    /**
     * The permissions granted by an AdministrativePermission.
     */
    @JsonProperty("hasPermissions", [CreatePermission])
    hasPermissions: CreatePermission[] = [];

}
