import { JsonObject, JsonProperty } from "json2typescript";
import { CreateAdministrativePermission } from "./create-administrative-permission";

/**
 * Creation of a default object access permission permission.
 */
@JsonObject("CreateDefaultObjectAccessPermission")
export class CreateDefaultObjectAccessPermission extends CreateAdministrativePermission {

    @JsonProperty("forProperty")
    forProperty: string | null = null;

    @JsonProperty("forResourceClass")
    forResourceClass: string | null = null;

}
