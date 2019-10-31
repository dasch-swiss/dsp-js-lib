import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";

@JsonObject("DeleteValue")
export class DeleteValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.DeleteComment, String, true)
    deleteComment?: string = undefined;

}
