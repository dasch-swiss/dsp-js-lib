import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization";
import { Person } from "../project-metadata/person";

/**
 * @category Internal
 */
@JsonConverter
export class PersonOrganizationConverter implements JsonCustomConvert<Person | Organization | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(obj: Person | Organization | object): any {
        if (obj.hasOwnProperty("jobTitle")) {
            return PersonOrganizationConverter.jsonConvert.serializeObject(obj, Person);
        } else if (obj.hasOwnProperty("name")) {
            return PersonOrganizationConverter.jsonConvert.serializeObject(obj, Organization);
        } else if (obj.hasOwnProperty("id")) {
            return {
                "@id": (obj as { [index: string]: string })["id"]
            };
        }
    }

    deserialize(obj: any): Person | Organization | object {
        if (obj.hasOwnProperty(Constants.DspHasJobTitle)) {
            return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Person);
        } else if (obj.hasOwnProperty(Constants.DspHasJobTitle)) {
            return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Organization);
        } else {
            if (obj.hasOwnProperty("@id")) {
                return {
                    id: obj["@id"]
                };
            } else {
                throw new Error("Expected Person, Organization or reference with @id key");
            }
        }
    }
}
