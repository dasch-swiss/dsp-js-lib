import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, PropertyMatchingRule, ValueCheckingMode } from "json2typescript";
import { IId } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization";
import { Person } from "../project-metadata/person";

/**
 * @category Internal
 */
@JsonConverter
export class UnionPersonOrganizationIdConverter implements JsonCustomConvert
    <Person | Organization | object | Person[] | Organization[] | IId[]> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: Person | Organization | object): any {
        if (Array.isArray(el)) {
            return el.map(
                (item: Person | Organization | object) => this.serializeElement(item)
            );
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): Person[] | Organization[] | IId[] {
        if (Array.isArray(el)) {
            return el.map(
                (item: any) => this.deserializeElement(item)
            );
        } else {
            const newArr = [] as Array<Person | Organization | IId>;
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
            throw new Error(`Serialziation Error: expected Person or Organization object type, or reference object 
                with id key. Instead got ${typeof el}.`);
        }
    }

    private deserializeElement(el: any): Person | Organization | IId {
        if (el.hasOwnProperty(Constants.DspHasJobTitle)) {
            return UnionPersonOrganizationIdConverter.jsonConvert.deserializeObject(el, Person);
        } else if (el.hasOwnProperty(Constants.DspHasName)) {
            return UnionPersonOrganizationIdConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@id") && (!el.hasOwnProperty(Constants.DspHasJobTitle) || !el.hasOwnProperty(Constants.DspHasName))) {
            return { id: el["@id"] };
        } else {
            throw new Error(`Deserialization Error: expected an object with ${Constants.DspPerson} or ${Constants.DspOrganization} key, 
                or reference object with @id key.`);
        }
    }
}
