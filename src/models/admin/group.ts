import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "./string-literal";

/**
 * A group of Knora users.
 *
 * @category Model Admin
 */
@JsonObject("Group")
export class Group {

    /**
     * A description of a user group
     */
    @JsonProperty("descriptions", [StringLiteral], true)
    descriptions?: StringLiteral[] = [];

    /**
     * The name of the enclosing object.
     */
    @JsonProperty("name", String)
    name: string = "";

    /**
     * Exists and is true if users can add themselves to the project or group.
     */
    @JsonProperty("selfjoin", Boolean)
    selfjoin: boolean = false;

    /**
     * The status of the user / group / project. It is false if the entity has been deactivated (deleted).
     */
    @JsonProperty("status", Boolean, true)
    status?: boolean = undefined;

}
