import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("BaseResource")
export abstract class BaseResource {

    @JsonProperty("@type", String)
    type: string = "";

}
