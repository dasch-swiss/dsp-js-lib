import { JsonObject, JsonProperty } from "json2typescript";
import { ILogoutResponse } from "../../../interfaces/models/v2/i-logout-response";

@JsonObject("LogoutResponse")
export class LogoutResponse implements ILogoutResponse {

    @JsonProperty("message", String)
    message: string = "";

    @JsonProperty("status", Number)
    status: number = 0;

}
