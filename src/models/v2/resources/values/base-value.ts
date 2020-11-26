import { JsonObject, JsonProperty } from "json2typescript";

/**
 * @internal
 */
@JsonObject("BaseValue")
export abstract class BaseValue {

    @JsonProperty("@type", String)
    type: string = "";

}
