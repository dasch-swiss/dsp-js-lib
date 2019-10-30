import { JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { BaseValue } from "./base-value";

export class UpdateValue extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

}
