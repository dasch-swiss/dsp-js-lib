import { Any, JsonObject, JsonProperty } from "json2typescript";

import { ReadGroup } from "./read-group";

/**
 * A response providing a collection of groups.
 */
@JsonObject("GroupsResponse")
export class GroupsResponse {

    /**
     * A collection of groups.
     */
    @JsonProperty("groups", [ReadGroup])
    groups: ReadGroup[] = [];

}