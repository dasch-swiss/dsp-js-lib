import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseBooleanValue } from "../type-specific-interfaces/base-boolean-value";
import { CreateValue } from "./create-value";

@JsonObject("CreateBooleanValue")
export class CreateBooleanValue extends CreateValue implements IBaseBooleanValue {

    @JsonProperty(Constants.BooleanValueAsBoolean, Boolean)
    bool: boolean = false;

    constructor() {
        super(Constants.BooleanValue);
    }

}
