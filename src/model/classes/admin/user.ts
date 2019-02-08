import { Any, JsonObject, JsonProperty } from "json2typescript";

import { IUser } from "../../interfaces/admin/i-user";

@JsonObject("User")
export class User implements IUser {

    @JsonProperty("id", String)
    public id: string = "";

    @JsonProperty("email", String)
    public email: string = "";

    @JsonProperty("username", String, true)
    public username: string = "";

    @JsonProperty("password", String)
    public password: string = "";

    @JsonProperty("token", String)
    public token: string = "";

    @JsonProperty("givenName", String)
    public givenName: string = "";

    @JsonProperty("familyName", String)
    public familyName: string = "";

    @JsonProperty("status", Boolean)
    public status: boolean = false;

    @JsonProperty("lang", String)
    public lang: string = "";

    @JsonProperty("groups", [Any])
    public groups: any[] = [];

    @JsonProperty("projects", [Any])
    public projects: any[] = [];

    @JsonProperty("sessionId", String)
    public sessionId: string = "";

    @JsonProperty("permissions", Any)
    public permissions: any = null;

    @JsonProperty("systemAdmin", Boolean, true)
    public systemAdmin?: boolean = false;

}