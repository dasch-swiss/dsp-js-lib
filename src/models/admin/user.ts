import { Any, JsonObject, JsonProperty } from "json2typescript";

import { IUser } from "../../interfaces/models/admin/i-user";

@JsonObject("User")
export class User implements IUser {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("email", String)
    email: string = "";

    @JsonProperty("username", String)
    username: string = "";

    @JsonProperty("password", String, true)
    password: string = "";

    // @JsonProperty("token", String)
    token: string = "";

    @JsonProperty("givenName", String)
    givenName: string = "";

    @JsonProperty("familyName", String)
    familyName: string = "";

    @JsonProperty("status", Boolean)
    status: boolean = false;

    @JsonProperty("lang", String)
    lang: string = "";

    @JsonProperty("groups", [Any])
    groups: any[] = [];

    @JsonProperty("projects", [Any])
    projects: any[] = [];

    // @JsonProperty("sessionId", String)
    sessionId: string = "";

    @JsonProperty("permissions", Any)
    permissions: any = null;

    @JsonProperty("systemAdmin", Boolean, true)
    systemAdmin?: boolean = false;

}
