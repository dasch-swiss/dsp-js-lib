import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { WriteValue } from "../write-value";

@JsonObject("CreateValue")
export abstract class CreateValue extends WriteValue {

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;
}
