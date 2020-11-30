import { JsonObject, JsonProperty } from "json2typescript";

/**
 * A request to create a group.
 *
 * @category Model
 */
@JsonObject("CreateGroupRequest")
export class CreateGroupRequest {

    /**
     * A description of a user group
     */
    @JsonProperty("description", String, true)
    description?: string = undefined;

    /**
     * The name of the enclosing object.
     */
    @JsonProperty("name", String)
    name: string = "";

    /**
     * The IRI of a project.
     */
    @JsonProperty("project", String)
    project: string = "";

    /**
     * Exists and is true if users can add themselves to the project or group.
     */
    @JsonProperty("selfjoin", Boolean)
    selfjoin: boolean = false;

    /**
     * The status of the user / group / project. It is false if the entity has been deactivated (deleted).
     */
    @JsonProperty("status", Boolean)
    status: boolean = false;

}
