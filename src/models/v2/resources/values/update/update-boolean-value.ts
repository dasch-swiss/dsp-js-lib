import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseBooleanValue } from "../type-specific-interfaces/base-boolean-value";
import { UpdateValue } from "./update-value";

@JsonObject("UpdateBooleanValue")
export class UpdateBooleanValue extends UpdateValue implements IBaseBooleanValue {

    @JsonProperty(Constants.BooleanValueAsBoolean, Boolean)
    bool: boolean = false;

}
