import { Any, JsonObject, JsonProperty } from "json2typescript";

import { ReadUser } from "./read-user";

/**
 * A response providing a single user.
 */
@JsonObject("UserResponse")
export class UserResponse {

    /**
     * The user returned in a UserResponse.
     */
    @JsonProperty("user", ReadUser)
    user: ReadUser = new ReadUser();

}