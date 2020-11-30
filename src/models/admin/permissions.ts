import { JsonObject, JsonProperty } from "json2typescript";

import { IPermissions } from "../../interfaces/models/admin/i-permissions";

/**
 * @category Model
 */
@JsonObject("Permissions")
export class Permissions implements IPermissions {

    @JsonProperty("groupsPerProject")
    groupsPerProject: any = {};

    @JsonProperty("administrativePermissionsPerProject")
    administrativePermissionsPerProject: any = {};

}
