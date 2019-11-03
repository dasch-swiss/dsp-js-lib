import { JsonObject, JsonProperty } from "json2typescript";

export abstract class BaseValue {

    @JsonProperty("@type", String)
    type: string = "";

}
