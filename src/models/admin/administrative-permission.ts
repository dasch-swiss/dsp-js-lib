import { JsonObject, JsonProperty } from "json2typescript";

import { Permission } from "./permission";

/**
 * An administrative permission.
 */
@JsonObject("AdministrativePermission")
export class AdministrativePermission {

    /**
     * The administrative permission's iri.
     */
    @JsonProperty("iri", String)
    id: string = "";

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
     * The property that the permission applies to.
     */
    @JsonProperty("forProperty", String, true)
    forProperty?: string = undefined;

    /**
     * The resource class that the permission applies to.
     */
    @JsonProperty("forResourceClass", String, true)
    forResourceClass?: string = undefined;

    /**
     * The permissions granted by an AdministrativePermission.
     */
    @JsonProperty("hasPermissions", [Permission])
    hasPermissions: Permission[] = [];

}
