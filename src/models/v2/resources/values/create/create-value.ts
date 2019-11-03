import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { ReadWriteValue } from "../read-write-value";

@JsonObject("CreateValue")
export abstract class CreateValue extends ReadWriteValue {

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;
}
