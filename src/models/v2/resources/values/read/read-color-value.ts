import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { ReadValue } from "./read-value";

@JsonObject("ReadColorValue")
export class ReadColorValue extends ReadValue {

    @JsonProperty(Constants.ColorValueAsColor, String)
    color: string = "";
}
