import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { concatAll } from "rxjs/operators";
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

    serialize(val: Person | Organization | string): any {
        
        if (val.hasOwnProperty(Constants.DspName) || val.hasOwnProperty(Constants.DspJobTitle)) {
            console.log('sePERSON', val)
            if (val.hasOwnProperty(Constants.DspJobTitle)) {
                return PersonOrganizationConverter.jsonConvert.serializeObject(val, Person);
            } else {
                return PersonOrganizationConverter.jsonConvert.serializeObject(val, Organization);
            }
        } else {
            console.log('seString', val);
            return {
                "@id": val
            };
        }
    }

    deserialize(obj: object): Person | Organization | string {
        console.log('dePERSON', obj);
        if (obj.hasOwnProperty(Constants.DspName) || obj.hasOwnProperty(Constants.DspJobTitle)) {
            if (obj.hasOwnProperty(Constants.DspJobTitle)) {
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
