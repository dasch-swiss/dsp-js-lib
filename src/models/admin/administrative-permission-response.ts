import { Any, JsonObject, JsonProperty } from "json2typescript";

import { AdministrativePermission } from "./administrative-permission";

/**
 * A response providing a single administrative permission.
 */
@JsonObject("AdministrativePermissionResponse")
export class AdministrativePermissionResponse {

    /**
     * Provides a single administrative permission.
     */
    @JsonProperty("administrative_permission", AdministrativePermission)
    administrative_permission: AdministrativePermission = new AdministrativePermission();

}