import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseIntValue } from "../type-specific-interfaces/base-int-value";
import { UpdateValue } from "./update-value";

@JsonObject("UpdateIntValue")
export class UpdateIntValue extends UpdateValue implements IBaseIntValue {

    @JsonProperty(Constants.IntValueAsInt, Number)
    int: number = 0;
}
