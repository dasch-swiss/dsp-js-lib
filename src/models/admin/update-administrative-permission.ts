/**
 * Creation of an administrative permission.
 *
 * @category Model Admin
 */
import { JsonObject, JsonProperty } from "json2typescript";
import { CreatePermission } from "./create-permission";

@JsonObject("UpdateAdministrativePermission")
export class UpdateAdministrativePermission {

    /**
     * The permissions granted by an AdministrativePermission.
     */
    @JsonProperty("hasPermissions", [CreatePermission])
    hasPermissions: CreatePermission[] = [];

}
