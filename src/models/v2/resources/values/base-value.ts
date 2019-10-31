import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";

export abstract class BaseValue {

    @JsonProperty("@type", String)
    type: string = "";

}
