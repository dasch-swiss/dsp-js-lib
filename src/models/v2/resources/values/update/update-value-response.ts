import { JsonObject, JsonProperty } from "json2typescript";
import { BaseValue } from "../base-value";

@JsonObject("UpdateValueResponse")
export class UpdateValueResponse extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

}
