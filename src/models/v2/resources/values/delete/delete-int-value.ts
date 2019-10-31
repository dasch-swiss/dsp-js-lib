import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IBaseIntValue } from "../base-int-value";
import { DeleteValue } from "./delete-value";

@JsonObject("DeleteIntValue")
export class DeleteIntValue extends DeleteValue implements IBaseIntValue {

    @JsonProperty(Constants.IntValueAsInt, Number)
    int: number = 0;
}
