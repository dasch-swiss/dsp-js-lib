import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

/**
 * @category Model
 */
@JsonObject("CountQueryResponse")
export class CountQueryResponse {

    @JsonProperty(Constants.SchemaNumberOfItems, Number)
    numberOfResults: number = 0;

}
