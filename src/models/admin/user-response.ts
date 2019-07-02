import { JsonObject, JsonProperty } from "json2typescript";

import { IUserResponse } from "../../interfaces/models/admin/i-user-response";
import { User } from "./user";

@JsonObject("UserResponse")
export class UserResponse implements IUserResponse {

    @JsonProperty("user", User)
    user: User = new User();

}
