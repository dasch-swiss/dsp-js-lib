import { Any, JsonObject, JsonProperty } from "json2typescript";

import { Group } from "./group";

/**
 * A group of Knora users.
 */
@JsonObject("StoredGroup")
export class StoredGroup extends Group {

    /**
     * The ID of the enclosing object.
     */
    @JsonProperty("id", String)
    id: string = "";

}