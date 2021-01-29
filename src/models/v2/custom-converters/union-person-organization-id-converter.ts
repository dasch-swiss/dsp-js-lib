import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization";
import { Person } from "../project-metadata/person";

/**
 * @category Internal
 */
@JsonConverter
export class UnionPersonOrganizationIdConverter implements JsonCustomConvert<Person | Organization | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: Person | Organization | object): any {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach((
                (item: Person | Organization | object) => newArr.push(this.serializeElement(item))
            ));
            return newArr;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): Person | Organization | object {
        const newArr = [] as Array<Person | Organization | object>;
        if (Array.isArray(el)) {
            el.forEach((
                (item: any) => newArr.push(this.deserializeElement(item))
            ));
            return newArr;
        } else {
            newArr.push(this.deserializeElement(el));
            return newArr;
        }
    }

    private serializeElement(el: Person | Organization | object): any {
        if (el.hasOwnProperty("jobTitle")) {
            return UnionPersonOrganizationIdConverter.jsonConvert.serializeObject(el, Person);
        } else if (el.hasOwnProperty("name")) {
            return UnionPersonOrganizationIdConverter.jsonConvert.serializeObject(el, Organization);
        } else if (el.hasOwnProperty("id") && (!el.hasOwnProperty("jobTitle") && !el.hasOwnProperty("name"))) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error(`Serialziation Error: expected a Person or Organization object type, or reference object 
                with id key. Instead got ${typeof el}.`);
        }
    }

    private deserializeElement(el: any): Person | Organization | object {
        if (el.hasOwnProperty(Constants.DspHasJobTitle)) {
            return UnionPersonOrganizationIdConverter.jsonConvert.deserializeObject(el, Person);
        } else if (el.hasOwnProperty(Constants.DspHasName)) {
            return UnionPersonOrganizationIdConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@id") && (!el.hasOwnProperty(Constants.DspHasJobTitle) || !el.hasOwnProperty(Constants.DspHasName))) {
            return {
                id: (el as { [index: string]: string })["@id"]
            };
        } else {
            throw new Error(`Deserialization Error: expected an object with ${Constants.DspPerson} or ${Constants.DspOrganization} key, 
                or reference object with @id key.`);
        }
    }
}
