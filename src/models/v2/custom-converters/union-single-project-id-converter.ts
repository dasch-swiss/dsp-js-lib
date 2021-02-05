import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { IId } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { SingleProject } from "../project-metadata/single-project";

/**
 * Converts SingleProject class or object containing refrence id
 * @category Internal
 */
@JsonConverter
export class UnionSingleProjctIdConverter implements JsonCustomConvert<SingleProject | IId | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: SingleProject | object): any {
        if (el.hasOwnProperty("type") && (el as SingleProject)["type"] === Constants.DspProject) {
            return UnionSingleProjctIdConverter.jsonConvert.serializeObject(el, SingleProject);
        } else if (!el.hasOwnProperty("type") && el.hasOwnProperty("id")) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error(`Serialization Error: expected SingleProject object type or reference object 
                with id property. Instead got ${typeof el}.`);
        }
    }

    deserialize(el: any): SingleProject | IId {
        if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspProject) {
            return UnionSingleProjctIdConverter.jsonConvert.deserializeObject(el, SingleProject);
        } else if (!el.hasOwnProperty("@type") && el.hasOwnProperty("@id")) {
            return {id: el};
        } else {
            throw new Error(`Deserialization Error: expected an object with @type property equals to 
                ${Constants.DspProject} or a reference object with @id property.`);
        }
    }
}
