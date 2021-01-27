import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";

/**
 * @category Internal
 */
@JsonObject("UpdateResourceClass")
export abstract class UpdateResourceClass {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string =  Constants.Class;
}
