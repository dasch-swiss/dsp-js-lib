import { JsonObject, JsonProperty } from "json2typescript";

import { StoredGroup } from "./stored-group";
import { StoredProject } from "./stored-project";

/**
 * A group of Knora users.
 */
@JsonObject("ReadGroup")
export class ReadGroup extends StoredGroup {

    /**
     * Indicates which project a group belongs to.
     */
    @JsonProperty("project", StoredProject, true)
    project?: StoredProject = undefined;

}
