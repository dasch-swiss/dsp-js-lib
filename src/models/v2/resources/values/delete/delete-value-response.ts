import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";

@JsonObject("DeleteValueResponse")
export class DeleteValueResponse {

    @JsonProperty(Constants.Result, String)
    result: string = "";
}
