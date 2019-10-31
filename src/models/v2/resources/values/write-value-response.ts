import { JsonObject, JsonProperty } from "json2typescript";
import { BaseValue } from "./base-value";

@JsonObject("WriteValueResponse")
export class WriteValueResponse extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

}
