import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization-definition";
import { Person } from "../project-metadata/person-definition";

@JsonConverter
export class PersonOrganizationConverter implements JsonCustomConvert<Person | Organization | string> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(obj: Person | Organization): any {
        return;
    }

    deserialize(obj: object): Person | Organization | string {
        const personProp = Constants.DspRepoBase + "hasJobTitle";
        if (obj.hasOwnProperty(Constants.DspName) || obj.hasOwnProperty(personProp)) {
            if (obj.hasOwnProperty(personProp)) {
                return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Person);
            } else {
                return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Organization);
            }
        } else {
            if (obj.hasOwnProperty("@id")) {
                return (obj as { [index: string]: string})["@id"]; //map this to desired object instance
            } else {
                throw new Error("Expected Person, Organization or reference with @id key");
            }
        }
    }
}
