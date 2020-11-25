import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization-definition";
import { Person } from "../project-metadata/person-definition";
import { IdConverter } from "./id-converter";

@JsonConverter
export class PersonOrganizationConverter implements JsonCustomConvert<Person | Organization | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(obj: Person | Organization): any {
        return;
    }

    deserialize(obj: object): Person | Organization | object {
        const orgProp = Constants.dspRepoBase + "hasName";
        const personProp = Constants.dspRepoBase + "hasJobTitle";
        if (obj.hasOwnProperty(orgProp) || obj.hasOwnProperty(personProp)) {
            if (obj.hasOwnProperty(personProp)) {
                return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Person);
            } else {
                return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Organization);
            }
        } else {
            return obj; //map this to desired object instance
        }
    }
}
