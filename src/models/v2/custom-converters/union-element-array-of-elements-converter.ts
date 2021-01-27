import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Attribution } from "../project-metadata/attribution";
import { Grant } from "../project-metadata/grant";
import { Place } from "../project-metadata/place";

/**
 * Experimental converter to distinguish elements and arrays of these as a first step of conversion
 * @category Internal
 */
@JsonConverter
export class UnionElementArrayOfElementsConverter implements JsonCustomConvert<any> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(el: any): any {
        if (Array.isArray(el)) {
            switch (true) {
                case el[0].hasOwnProperty("type") && el[0]["type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Attribution);
                case el[0].hasOwnProperty("type") && el[0]["type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Grant);
                case el[0].hasOwnProperty("place"):
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Place);
            }
        } else {
            switch (true) {
                case el.hasOwnProperty("type") && el["type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Attribution);
                case el.hasOwnProperty("type") && el["type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Grant);
                case el.hasOwnProperty("place"):
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Place);
            }
        }
    }

    deserialize(el: any ): any {
        if (Array.isArray(el)) {
            switch (true) {
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Attribution);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Grant);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Place);
            }
        } else {
            switch (true) {
                case el.hasOwnProperty("@type") && el["@type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Attribution);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Grant);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Place);
            }
        }
    }
}
