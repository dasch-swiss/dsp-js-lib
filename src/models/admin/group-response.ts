import { Any, JsonObject, JsonProperty } from "json2typescript";

import { ReadGroup } from "./read-group";

/**
 * A response providing a single group.
 */
@JsonObject("GroupResponse")
export class GroupResponse {

    /**
     * A single group.
     */
    @JsonProperty("group", ReadGroup)
    group: ReadGroup = new ReadGroup();

}