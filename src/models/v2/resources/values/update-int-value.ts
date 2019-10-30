import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { UpdateValue } from "./update-value";

@JsonObject("ReadIntValue")
export class UpdateIntValue extends UpdateValue {

    @JsonProperty(Constants.IntValueAsInt, Number)
    int: number = 0;
}
