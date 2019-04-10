import { JsonObject, JsonProperty } from "json2typescript";

import { IUserList } from "../../interfaces/models/admin/i-user-list";
import { User } from "./user";

@JsonObject("UserList")
export class UserList implements IUserList {

    @JsonProperty("users", [User])
    users: User[] = [];

}
