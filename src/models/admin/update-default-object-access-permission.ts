/**
 * Update of a default object access permission.
 *
 * @category Model Admin
 */
import { JsonObject, JsonProperty } from "json2typescript";
import { CreatePermission } from "./create-permission";

@JsonObject("UpdateDefaultObjectAccessPermission")
export class UpdateDefaultObjectAccessPermission {

    /**
     * The permissions granted by an default object access permission.
     */
    @JsonProperty("hasPermissions", [CreatePermission])
    hasPermissions: CreatePermission[] = [];

}
