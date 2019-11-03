import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { DecimalConverter } from "../../../custom-converters/decimal-converter";
import { IBaseDecimalValue } from "../type-specific-interfaces/base-decimal-value";
import { CreateValue } from "./create-value";

@JsonObject("CreateDecimalValue")
export class CreateDecimalValue extends CreateValue implements IBaseDecimalValue {

    @JsonProperty(Constants.DecimalValueAsDecimal, DecimalConverter)
    decimal: number = 0;

    // TODO: this decorator is redundant (inherited from UpdateValue)
    // Actually, "It is not allowed to add multiple decorators for the same property." should be thrown in this case.
    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

}
