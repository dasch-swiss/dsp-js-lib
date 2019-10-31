import { JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { ReadWriteValue } from "../read-write-value";

export abstract class UpdateValue extends ReadWriteValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

}
