import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DecimalConverter } from "../../CustomConverters";
import { ReadValue } from "./read-value";

@JsonObject("ReadDecimalValue")
export class ReadDecimalValue extends ReadValue {

    @JsonProperty(Constants.DecimalValueAsDecimal, DecimalConverter)
    decimal: number = 0;
}
