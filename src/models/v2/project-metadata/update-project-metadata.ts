import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

@JsonObject("UpdateProjectMetadataResponse")
export class UpdateProjectMetadataResponse {

    @JsonProperty(Constants.KnoraApiV2 + Constants.Delimiter + "result", String)
    result: string = "";
}
