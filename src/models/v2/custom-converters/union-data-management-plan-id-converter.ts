import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { DataManagementPlan } from "../project-metadata/data-management-plan";
import { IId } from "../project-metadata/metadata-interfaces";

/**
 * @category Internal
 */
@JsonConverter
export class UnionDataManagementPlanIdConverter implements JsonCustomConvert<DataManagementPlan | IId | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: Array<DataManagementPlan | object>): any {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach(
                (item: DataManagementPlan | object) => newArr.push(this.serializeElement(item))
            );
            return newArr;
        }
    }

    deserialize(el: any): Array<DataManagementPlan | IId> {
        const newArr = [] as Array<DataManagementPlan | IId>;
        if (Array.isArray(el)) {
            el.forEach(
                (item: any) => newArr.push(this.deserializeElement(item))
            );
            return newArr;
        } else {
            newArr.push(this.deserializeElement(el));
            return newArr;
        }
    }

    private serializeElement(el: DataManagementPlan | object): any {
        if (el.hasOwnProperty("type") && (el as {type: string})["type"] === Constants.DspDataManagementPlan) {
            return UnionDataManagementPlanIdConverter.jsonConvert.serializeObject(el, DataManagementPlan);
        } else if (el.hasOwnProperty("id") && !el.hasOwnProperty("type")) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error(`Serialization Error: expected DataManagementPlan object type or an object with id key. 
                Instead got ${typeof el}.`);
        }
    }

    private deserializeElement(el: any): DataManagementPlan | IId {
        if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspDataManagementPlan) {
            return UnionDataManagementPlanIdConverter.jsonConvert.deserializeObject(el, DataManagementPlan);
        } else if (el.hasOwnProperty("@id") && !el.hasOwnProperty("@type")) {
            return { id: el };
        } else {
            throw new Error(`Deserialization Error: expected an object with property @type equals to 
                ${Constants.DspDataManagementPlan} or an object with @id key.`);
        }
    }
}
