import { JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { BaseValue } from "./base-value";

export abstract class ReadWriteValue extends BaseValue {

    @JsonProperty(Constants.ValueHasComment, String, true)
    valueHasComment?: string = undefined;

}
