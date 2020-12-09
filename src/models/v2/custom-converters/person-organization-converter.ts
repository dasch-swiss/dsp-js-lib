import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization-definition";
import { Person } from "../project-metadata/person-definition";

@JsonConverter
export class PersonOrganizationConverter implements JsonCustomConvert<Person | Organization | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(obj: Person | Organization | object): any {
        if (obj.hasOwnProperty("name") || obj.hasOwnProperty("jobTitle")) {
            if (obj.hasOwnProperty("jobTitle")) {
                return PersonOrganizationConverter.jsonConvert.serializeObject(obj, Person);
            } else {
                return PersonOrganizationConverter.jsonConvert.serializeObject(obj, Organization);
            }
        } else if (obj.hasOwnProperty("id")) {
            return {
                "@id": (obj as { [index: string]: string })["id"]
            };
        }
    }

    deserialize(obj: any): Person | Organization | object {
        if (obj.hasOwnProperty(Constants.DspName) || obj.hasOwnProperty(Constants.DspJobTitle)) {
            if (obj.hasOwnProperty(Constants.DspJobTitle)) {
                return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Person);
            } else {
                return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Organization);
            }
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
