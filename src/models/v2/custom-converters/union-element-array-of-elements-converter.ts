import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, PropertyMatchingRule, ValueCheckingMode } from "json2typescript";
import { IId } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { Attribution } from "../project-metadata/attribution";
import { Grant } from "../project-metadata/grant";
import { Place } from "../project-metadata/place";

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
    
    serialize(el: Attribution): any {
        if (Array.isArray(el)) {
            if (el[0].hasOwnProperty("type") && (el[0] as {type: string})["type"] === Constants.ProvAttribution) {
                return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Attribution);
            } else if (el[0].hasOwnProperty("type") && (el[0] as Grant)["type"] === Constants.DspGrant) {
                return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Grant);
            } else if (el[0].hasOwnProperty("place")) {
                return UnionElementArrayOfElementsConverter.jsonConvert.serializeArray(el, Place);
            } else {
                throw new Error(`Serialization Error: expected Attribution[], Grant[] or Place[] type. 
                    Instead got ${typeof el}.`);
            }
        } else {
            if (el.hasOwnProperty("id")) {
                return { "@id": el.id };
            } else {
                throw new Error(`Serialization Error: expected reference object with id key. Instead got 
                    ${typeof el}.`);
            }
        }
    }

    deserialize(el: any ): Attribution | Grant | Place | IId | Attribution[] | Grant[] | Place[] | IId[] {
        if (Array.isArray(el)) {
            if (el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.ProvAttribution) {
                return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Attribution);
            } else if (el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.DspGrant) {
                return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Grant);
            } else if ((el[0].hasOwnProperty("@type") && el[0]["@type"] === Constants.SchemaPlace) 
            // below condition is temp solution for data sent from the test app, due to different structure
                || el[0].hasOwnProperty(Constants.SchemaUrlValue)) {
                return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray(el, Place);
            } else if (el[0].hasOwnProperty("@id")) {
                const newArr = [] as IId[];
                el.forEach(
                    (item: any) => newArr.push({id: item["@id"]})
                );
                return newArr;
            } else {
                throw new Error(`Deserialization Error: expected an array of objects with property @type equals to: 
                    ${Constants.ProvAttribution}, ${Constants.DspGrant}, ${Constants.SchemaPlace}, or a reference 
                    object with @id key.`);
            }
        } else {
            if (el.hasOwnProperty("@type") && el["@type"] === Constants.ProvAttribution) {
                return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray([el], Attribution);
            } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant) {
                return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray([el], Grant);
            } else if ((el.hasOwnProperty("@type") && el["@type"] === Constants.SchemaPlace) 
            // below condition is temp solution for data sent from the test app, due to different structure
                || el.hasOwnProperty(Constants.SchemaUrlValue)) {
                return UnionElementArrayOfElementsConverter.jsonConvert.deserializeArray([el], Place);
            } else if (el.hasOwnProperty("@id")) {
                return [{ id: el["@id"] }];
            } else {
                throw new Error(`Deserialization Error: expected an object with property @type equals to: 
                    ${Constants.ProvAttribution}, ${Constants.DspGrant}, ${Constants.SchemaPlace}, or a reference 
                    object with @id key`);
            }
        }
    }
}
