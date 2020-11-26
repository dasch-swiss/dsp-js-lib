import { JsonObject, JsonProperty } from "json2typescript";

/**
 * @internal
 */
@JsonObject("BaseResource")
export abstract class BaseResource {

    @JsonProperty("@type", String)
    type: string = "";

}
