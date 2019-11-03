import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("BaseValue")
export abstract class BaseValue {

    @JsonProperty("@type", String)
    type: string = "";

}
