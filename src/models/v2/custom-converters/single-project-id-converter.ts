import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { SingleProject } from "../project-metadata/single-project";

/**
 * Converts SingleProject class or object containing refrence id
 * @category Internal
 */
@JsonConverter
export class SingleProjctIdConverter implements JsonCustomConvert<SingleProject | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: SingleProject | any): any {
        if (el.hasOwnProperty("type") && el["type"] === Constants.DspProject) {
            return SingleProjctIdConverter.jsonConvert.serializeObject(el, SingleProject);
        } else if (el.hasOwnProperty("id")) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error("Expected SingleProject object type or reference with id key");
        }
    }

    deserialize(el: any): SingleProject | object {
        if (el.hasOwnProperty(Constants.DspProject)) {
            return SingleProjctIdConverter.jsonConvert.deserializeObject(el, SingleProject);
        } else if (el.hasOwnProperty("@id")) {
            return {
                id: (el as { [index: string]: string })["@id"]
            };
        } else {
            throw new Error(`Expected ${Constants.DspProject} object type or reference with @id key.`);
        }
    }
}
