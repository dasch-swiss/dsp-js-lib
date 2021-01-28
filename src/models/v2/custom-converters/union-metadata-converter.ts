import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Dataset } from "../project-metadata/dataset";
import { Person } from "../project-metadata/person";

/**
 * @category Internal
 */
@JsonConverter
export class UnionMetadataConverter implements JsonCustomConvert<Array<Dataset | Person>> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serializeElement(el: Dataset | Person): any {
        if (el.hasOwnProperty("type") && el["type"] === Constants.DspDataset) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, Dataset);
        } else if (el.hasOwnProperty("type") && el["type"] === Constants.DspPerson) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, Person);
        } else {
            throw new Error(`Serialization Error: expected Dataset or Person object type. 
                Instead got ${typeof el}.`);
        }
    }

    deserializeElement(el: any): Dataset | Person {
        if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspDataset) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, Dataset);
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspPerson) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, Person);
        } else {
            throw new Error(`Deserialization Error: expected object with @type property equals to 
                ${Constants.DspDataset} or ${Constants.DspPerson}.`);
        }
    }

    serialize(el: Array<Dataset | Person>): any {
        const newObj = [] as any[];
        el.forEach((
            (item: Dataset | Person) => newObj.push(this.serializeElement(item))
        ));
        return newObj;
    }

    deserialize(el: any): Array<Dataset | Person> {
        const newObj = [] as Array<Dataset | Person>;
        el.forEach((
            (item: any) => newObj.push(this.deserializeElement(item))
        ));
        return newObj;
    }
}
