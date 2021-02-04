import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { IId } from "../project-metadata/metadata-interfaces";
import { Organization } from "../project-metadata/organization";

/**
 * @category Internal
 */
@JsonConverter
export class UnionOrganizationIdConverter implements JsonCustomConvert<Array<Organization | IId | object>> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: Array<Organization | object>): any {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach(
                (item: Organization | object) => newArr.push(this.serializeElement(item))
            );
            return newArr;
        }
    }

    deserialize(el: any): Array<Organization | IId> {
        const newArr = [] as Array<Organization | IId>;
        if (Array.isArray(el)) {
            el.forEach(
                (item: any) => newArr.push(this.deserializeElement(item))
            );
            return newArr;
        } else {
            newArr.push(this.deserializeElement(el));
            return newArr;
        }
    }

    private serializeElement(el: Organization | object): any {
        if (el.hasOwnProperty("name")) {
            return UnionOrganizationIdConverter.jsonConvert.serializeObject(el, Organization);
        } else if (el.hasOwnProperty("id") && !el.hasOwnProperty("name")) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error(`Serialization Error: expected Organization object type or an object with id key. 
                Instead got ${typeof el}.`);
        }
    }

    private deserializeElement(el: any): Organization | IId {
        if (el.hasOwnProperty(Constants.DspHasName)) {
            return UnionOrganizationIdConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@id") && !el.hasOwnProperty(Constants.DspHasName)) {
            return { id: el };
        } else {
            throw new Error(`Deserialization Error: expected an object with property @type equals to 
                ${Constants.DspOrganization} or an object with @id key.`);
        }
    }
}
