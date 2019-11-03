import { JsonObject, JsonProperty } from "json2typescript";
import { Constants, UpdateValue } from "../../../../..";
import { DecimalConverter } from "../../../custom-converters/decimal-converter";
import { IBaseDecimalValue } from "../type-specific-interfaces/base-decimal-value";

@JsonObject("CreateDecimalValue")
export class UpdateDecimalValue extends UpdateValue implements IBaseDecimalValue {

    @JsonProperty(Constants.DecimalValueAsDecimal, DecimalConverter)
    decimal: number = 0;

}
