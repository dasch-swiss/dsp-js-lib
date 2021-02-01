import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Update of a default object access permission's group.
 *
 * @category Model Admin
 */
@JsonObject("UpdateDefaultObjectAccessPermissionGroup")
export class UpdateDefaultObjectAccessPermissionGroup {

    /**
     * The group that the permission applies to.
     */
    @JsonProperty("forGroup", String)
    forGroup: string;

}
