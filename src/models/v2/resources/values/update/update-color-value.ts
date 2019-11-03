import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseColorValue } from "../type-specific-interfaces/base-color-value";
import { UpdateValue } from "./update-value";

@JsonObject("UpdateColorValue")
export class UpdateColorValue extends UpdateValue implements IBaseColorValue {

    @JsonProperty(Constants.ColorValueAsColor, String)
    color: string;

    // TODO: this decorator is redundant (inherited from UpdateValue)
    // Actually, "It is not allowed to add multiple decorators for the same property." should be thrown in this case.
    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

}
