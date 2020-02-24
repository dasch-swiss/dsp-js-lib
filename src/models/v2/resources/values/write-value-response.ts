import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { BaseValue } from "./base-value";

@JsonObject("WriteValueResponse")
export class WriteValueResponse extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.ValueHasUUID, String)
    uuid: string = "";
}
