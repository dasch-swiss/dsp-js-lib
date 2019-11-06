import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";

@JsonObject("CreateValue")
export abstract class CreateValue /*extends WriteValue*/ {

    @JsonProperty("@type", String)
    readonly type: string = "";

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

    @JsonProperty(Constants.ValueHasComment, String, true)
    valueHasComment?: string = undefined;

    constructor(type: string) {
        this.type = type;
    }

}
