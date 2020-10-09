import { JsonObject, JsonProperty } from "json2typescript";
import { CreateAdminDoapBase } from "./create-admin-doap-base";
import { CreatePermission } from "./create-permission";

/**
 * Creation of an administrative permission.
 */
@JsonObject("CreateAdministrativePermission")
export class CreateAdministrativePermission extends CreateAdminDoapBase {

    /**
     * The group that the permission applies to.
     */
    @JsonProperty("forGroup", String)
    forGroup: string;

}
