import { JsonProperty } from "json2typescript";

export abstract class BaseResource {

    @JsonProperty("@type", String)
    type: string = "";

}
