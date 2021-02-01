import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Update of an administrative permission's group.
 *
 * @category Model Admin
 */
@JsonObject("UpdateAdministrativePermission")
export class UpdateAdministrativePermissionGroup {

    /**
     * The group that the permission applies to.
     */
    @JsonProperty("forGroup", String)
    forGroup: string;

}
