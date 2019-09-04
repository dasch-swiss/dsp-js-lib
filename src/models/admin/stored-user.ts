import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "./user";

/**
 * Represents a Knora user.
 */
@JsonObject("StoredUser")
export class StoredUser extends User {

    /**
     * The ID of the enclosing object.
     */
    @JsonProperty("id", String)
    id: string = "";

}
