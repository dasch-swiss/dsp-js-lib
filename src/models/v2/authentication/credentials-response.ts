import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("CredentialsResponse")
export class CredentialsResponse {

    @JsonProperty("message")
    message: string = "";
}
