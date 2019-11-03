import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { ReadWriteValue } from "../read-write-value";

@JsonObject("UpdateValue")
export abstract class UpdateValue extends ReadWriteValue {

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

    @JsonProperty("@id", String)
    id: string = "";

}
