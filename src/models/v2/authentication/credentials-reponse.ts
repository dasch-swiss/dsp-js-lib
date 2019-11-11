import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("CredentialsReponse")
export class CredentialsReponse {

    @JsonProperty("message")
    message: string = "";
}
