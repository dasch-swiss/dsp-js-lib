import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Organization } from "../project-metadata/organization-definition";
import { Person } from "../project-metadata/person-definition";

@JsonConverter
export class PersonOrganizationConverter implements JsonCustomConvert<Person | Organization> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(obj: Person | Organization): any {
        return;
    }

    deserialize(obj: any): Person | Organization {
        if (obj.jobTitle) {
            return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Person);
        } else {
            return PersonOrganizationConverter.jsonConvert.deserializeObject(obj, Organization);
        }
    }
}
