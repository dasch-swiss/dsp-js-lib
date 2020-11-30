import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";

/**
 * @category Model
 */
@JsonObject("DeleteValueResponse")
export class DeleteValueResponse {

    @JsonProperty(Constants.Result, String)
    result: string = "";
}
