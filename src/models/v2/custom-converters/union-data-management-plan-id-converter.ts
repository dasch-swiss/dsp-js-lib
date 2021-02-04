import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { IId } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { DataManagementPlan } from "../project-metadata/data-management-plan";

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

    serialize(el: Array<DataManagementPlan | IId>): any {
        if (Array.isArray(el)) {
            return el.map(
                (item: DataManagementPlan | IId) => this.serializeElement(item)
            );
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): Array<DataManagementPlan | IId> {
        if (Array.isArray(el)) {
            return el.map(
                (item: any) => this.deserializeElement(item)
            );
        } else {
            const newArr = [] as Array<DataManagementPlan | IId>;
            newArr.push(this.deserializeElement(el));
            return newArr;
        }
    }

    private serializeElement(el: DataManagementPlan | IId): any {
        if (el.hasOwnProperty("type") && (el as {type: string})["type"] === Constants.DspDataManagementPlan) {
            return UnionDataManagementPlanIdConverter.jsonConvert.serializeObject(el, DataManagementPlan);
        } else if (el.hasOwnProperty("id") && !el.hasOwnProperty("type")) {
            return { "@id": el.id };
        } else {
            throw new Error(`Serialization Error: expected DataManagementPlan object type or an object with id 
                key. Instead got ${typeof el}.`);
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
