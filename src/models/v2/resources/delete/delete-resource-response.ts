import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";

/**
 * @category Model
 */
@JsonObject("DeleteResourceResponse")
export class DeleteResourceResponse {

    @JsonProperty(Constants.Result, String)
    result: string = "";

}
