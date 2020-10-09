import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Creation of a permission.
 */
@JsonObject("CreatePermission")
export class CreatePermission {

    /**
     * An IRI representing additional information about the permission.
     */
    @JsonProperty("additionalInformation")
    additionalInformation: string | null = null;

    /**
     * The name of the enclosing object.
     */
    @JsonProperty("name", String)
    name: string = "";

    /**
     * A permission's numeric permission code.
     */
    @JsonProperty("permissionCode")
    permissionCode: number | null = null;

}
