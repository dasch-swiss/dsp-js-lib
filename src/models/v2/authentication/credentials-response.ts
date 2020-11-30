import { JsonObject, JsonProperty } from "json2typescript";

/**
 * @category Model
 */
@JsonObject("CredentialsResponse")
export class CredentialsResponse {

    @JsonProperty("message")
    message: string = "";
}
