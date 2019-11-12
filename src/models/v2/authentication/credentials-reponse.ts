import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("CredentialsResponse")
export class CredentialsReponse {

    @JsonProperty("message")
    message: string = "";
}
