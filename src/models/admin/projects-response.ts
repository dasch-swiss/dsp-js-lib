import { Any, JsonObject, JsonProperty } from "json2typescript";

import { ReadProject } from "./read-project";

/**
 * A response providing a collection of projects.
 */
@JsonObject("ProjectsResponse")
export class ProjectsResponse {

    /**
     * The given user is part of the given project.
     */
    @JsonProperty("projects", [ReadProject])
    projects: ReadProject[] = [];

}