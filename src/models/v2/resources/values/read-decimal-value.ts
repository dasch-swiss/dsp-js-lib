import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DecimalConverter } from "../../custom-converters/decimal-converter";
import { ReadValue } from "./read-value";

@JsonObject("ReadDecimalValue")
export class ReadDecimalValue extends ReadValue {

    @JsonProperty(Constants.DecimalValueAsDecimal, DecimalConverter)
    decimal: number = 0;
}
