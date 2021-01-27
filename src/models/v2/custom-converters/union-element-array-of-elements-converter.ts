import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Attribution } from "../project-metadata/attribution";
import { Grant } from "../project-metadata/grant";
import { Place } from "../project-metadata/place";

/**
 * Experimental converter to distinguish elements and arrays of these as a first step
 * Attribution case are ready to use but not yet turned on inside classes 
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
            console.log("ser ARR", el);
            switch (true) {
                case el[0].hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Attribution);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Grant);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Place);
            }
        } else {
            console.log("ser EL", el);
            switch (true) {
                case el.hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Attribution);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Grant);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeObject(el, Place);
            }
        }
    }

    deserialize(el: any ): any {
        if (Array.isArray(el)) {
            console.log("deser ARR", el);
            switch (true) {
                case el[0].hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Attribution);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Grant);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Place);
            }
        } else {
            console.log("deser EL", el);
            switch (true) {
                case el.hasOwnProperty(Constants.DspHasQualifiedAttribution):
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Attribution);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Grant);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeObject(el, Place);
            }
        }
    }
}
