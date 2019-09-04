import { Any, JsonObject, JsonProperty } from "json2typescript";

import { StoredProject } from "./stored-project";
import { StoredUser } from "./stored-user";

/**
 * Represents a project that uses Knora.
 */
@JsonObject("ReadProject")
export class ReadProject extends StoredProject {

    /**
     * The members of a group or project.
     */
    @JsonProperty("members", [StoredUser])
    members: StoredUser[] = [];

    /**
     * The ontologies attached to a project.
     */
    @JsonProperty("ontologies", [String])
    ontologies: string[] = [];

}