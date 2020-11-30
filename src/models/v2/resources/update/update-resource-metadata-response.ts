import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";

/**
 * @category Model
 */
@JsonObject("UpdateResourceMetadataResponse")
export class UpdateResourceMetadataResponse {

    @JsonProperty(Constants.Result, String)
    result: string = "";

}
