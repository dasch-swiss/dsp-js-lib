import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { IdConverter } from "../../custom-converters/id-converter";
import { ReadValue } from "./read-value";

export abstract class ReadTextValue extends ReadValue {
}

@JsonObject("ReadTextValueAsString")
export class ReadTextValueAsString extends ReadTextValue {

    // TODO: query standoff, if any.

    @JsonProperty(Constants.ValueAsString, String)
    text: string = "";

}

@JsonObject("ReadTextValueAsXml")
export class ReadTextValueAsXml extends ReadTextValue {

    @JsonProperty(Constants.TextValueAsXml, String)
    xml: string = "";

    @JsonProperty(Constants.TextValueHasMapping, IdConverter)
    mapping: string = "";

}

@JsonObject("ReadTextValueAsHtml")
export class ReadTextValueAsHtml extends ReadTextValue {

    @JsonProperty(Constants.TextValueAsHtml, String)
    html: string = "";

}
