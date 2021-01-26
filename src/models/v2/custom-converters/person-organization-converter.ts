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

    serializeElement(el: Person | Organization | object): any {
        if (el.hasOwnProperty("jobTitle")) {
            return PersonOrganizationConverter.jsonConvert.serializeObject(el, Person);
        } else if (el.hasOwnProperty("name")) {
            return PersonOrganizationConverter.jsonConvert.serializeObject(el, Organization);
        } else if (el.hasOwnProperty("id") && (!el.hasOwnProperty("jobTitle") && !el.hasOwnProperty("name"))) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error("Expected Person or Organization object type, or reference with id key");
        }
    }

    deserializeElement(el: any): Person | Organization | object {
        if (el.hasOwnProperty(Constants.DspHasJobTitle)) {
            return PersonOrganizationConverter.jsonConvert.deserializeObject(el, Person);
        } else if (el.hasOwnProperty(Constants.DspHasName)) {
            return PersonOrganizationConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@id") && (!el.hasOwnProperty(Constants.DspHasJobTitle) || !el.hasOwnProperty(Constants.DspHasName))) {
            return {
                id: (el as { [index: string]: string })["@id"]
            };
        } else {
            throw new Error(`Expected ${Constants.DspPerson} or ${Constants.DspOrganization} object type, or reference with @id key`);
        }
    }

    serialize(el: Person | Organization | object): any {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach((
                (item: Person | Organization | object) => newObj.push(this.serializeElement(item))
            ));
            return newObj;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): Person | Organization | object {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach((
                (item: any) => newObj.push(this.deserializeElement(item))
            ));
            return newObj;
        } else {
            return this.deserializeElement(el);
        }
    }
}
