import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { IdConverter } from "../../../custom-converters/id-converter";
import {
    IBaseTextValueAsHtml,
    IBaseTextValueAsString,
    IBaseTextValueAsXml
} from "../type-specific-interfaces/base-text-value";
import { ReadValue } from "./read-value";

@JsonObject("ReadTextValue")
export abstract class ReadTextValue extends ReadValue {
}

@JsonObject("ReadTextValueAsString")
export class ReadTextValueAsString extends ReadTextValue implements IBaseTextValueAsString {

    // TODO: query standoff, if any.

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

}

@JsonObject("ReadTextValueAsXml")
export class ReadTextValueAsXml extends ReadTextValue implements IBaseTextValueAsXml {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

}

@JsonObject("ReadTextValueAsHtml")
export class ReadTextValueAsHtml extends ReadTextValue implements IBaseTextValueAsHtml {

    @JsonProperty(Constants.TextValueAsHtml, String)
    html: string = "";

}
