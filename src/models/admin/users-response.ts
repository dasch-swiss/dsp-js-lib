import { JsonObject, JsonProperty } from "json2typescript";

import { IUsersResponse } from "../../interfaces/models/admin/i-users-response";
import { User } from "./user";

@JsonObject("UsersResponse")
export class UsersResponse implements IUsersResponse {

    @JsonProperty("users", [User])
    users: User[] = [];

}
