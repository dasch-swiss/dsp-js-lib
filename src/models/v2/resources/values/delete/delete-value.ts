import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { BaseValue } from "../base-value";

@JsonObject("DeleteValue")
export class DeleteValue extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.DeleteComment, String, true)
    deleteComment?: string = undefined;

}
