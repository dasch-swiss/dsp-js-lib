import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";

/**
 * @category Model
 */
@JsonObject("DeleteOntologyResponse")
export class DeleteOntologyResponse {

    @JsonProperty(Constants.Result, String)
    result: string = "";

}
