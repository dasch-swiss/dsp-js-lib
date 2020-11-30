import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";

/**
 * @category Model V2
 */
@JsonObject("UpdateResourceMetadataResponse")
export class UpdateResourceMetadataResponse {

    @JsonProperty(Constants.Result, String)
    result: string = "";

}
