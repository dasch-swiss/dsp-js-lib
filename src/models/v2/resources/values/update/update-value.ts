import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { WriteValue } from "../write-value";

@JsonObject("UpdateValue")
export abstract class UpdateValue /*extends WriteValue*/ {

    @JsonProperty("@id", String)
    id: string = "";

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
