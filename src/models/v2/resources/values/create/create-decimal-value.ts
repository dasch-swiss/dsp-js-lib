import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { DecimalConverter } from "../../../custom-converters/decimal-converter";
import { IBaseDecimalValue } from "../type-specific-interfaces/base-decimal-value";
import { CreateValue } from "./create-value";

@JsonObject("CreateDecimalValue")
export class CreateDecimalValue extends CreateValue implements IBaseDecimalValue {

    @JsonProperty(Constants.DecimalValueAsDecimal, DecimalConverter)
    decimal: number = 0;

}
