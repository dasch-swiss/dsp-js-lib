import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Attribution } from "../project-metadata/attribution";
import { Grant } from "../project-metadata/grant";
import { Place } from "../project-metadata/place";
import { IId } from "./union-data-management-plan-id-converter";

/**
 * @category Internal
 */
@JsonConverter
export class UnionElementArrayOfElementsConverter implements JsonCustomConvert
<Attribution | Attribution[] | Place | Place[] | Grant | Grant[] | IId | IId[]> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );
    
    serialize(el: Attribution[] | Place[] | Grant[]| object): any {
        if (Array.isArray(el)) {
            switch (true) {
                case el[0].hasOwnProperty("type") && (el[0] as {type: string})["type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Attribution);
                case el[0].hasOwnProperty("type") && (el[0] as Grant)["type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Grant);
                case el[0].hasOwnProperty("place"):
                    return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Place);
                default:
                    throw new Error(`Serialization Error: expected Attribution[], Grant[] or Place[] type. 
                        Instead got ${typeof el}.`);
            }
        } else {
            switch (true) {
                case el.hasOwnProperty("id"):
                    return {
                        "@id": (el as { [index: string]: string })["id"]
                    };
                default:
                    throw new Error(`Serialization Error: expected reference object with id key. 
                        Instead got ${typeof el}.`);
            }
        }
    }

    deserialize(el: any ): Attribution | Grant | Place | Attribution[] | Grant[] | Place[] | IId | IId[] {
        if (Array.isArray(el)) {
            switch (true) {
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Attribution);
                case el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Grant);
                case (el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace) 
                // below condition is temp solution for data sent from the test app, due to different structure
                    || el[0].hasOwnProperty(Constants.SchemaUrlValue):
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Place);
                case el[0].hasOwnProperty("@id"):
                    const newArr = [] as IId[];
                    if (Array.isArray(el)) {
                        el.forEach((
                            (item: any) => newArr.push({id: item})
                        ));
                    }
                    return newArr;
                default:
                    throw new Error(`Deserialization Error: expected an array of objects with property @type equals to: 
                        ${Constants.ProvAttribution}, ${Constants.DspGrant}, ${Constants.SchemaPlace}, or a reference 
                        object with id key.`);
            }
        } else {
            switch (true) {
                case el.hasOwnProperty("@type") && el["@type"] === Constants.ProvAttribution:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray([el], Attribution);
                case el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant:
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray([el], Grant);
                case (el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace) 
                // below condition is temp solution for data sent from the test app, due to different structure
                    || el.hasOwnProperty(Constants.SchemaUrlValue):
                    return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray([el], Place);
                case el.hasOwnProperty("@id"):
                    return {id: el};
                default:
                    throw new Error(`Deserialization Error: expected an object with property @type equals to: 
                        ${Constants.ProvAttribution}, ${Constants.DspGrant}, ${Constants.SchemaPlace}, or a reference 
                        object with id key`);
            }
        }
    }
}
