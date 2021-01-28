import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization";

/**
 * @category Internal
 */
@JsonConverter
export class UnionOrganizationIdConverter implements JsonCustomConvert<Organization | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serializeElement(el: Organization | object): any {
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

    deserializeElement(el: any): Organization | object {
        if (el.hasOwnProperty(Constants.DspHasName)) {
            return UnionOrganizationIdConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@id") && !el.hasOwnProperty(Constants.DspHasName)) {
            return {
                id: (el as { [index: string]: string })["@id"]
            };
        } else {
            throw new Error(`Deserialization Error: expected an object with property @type equals to 
                ${Constants.DspOrganization} or an object with @id key.`);
        }
    }

    serialize(el: Organization | object): any {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach((
                (item: Organization | object) => newObj.push(this.serializeElement(item))
            ));
            return newObj;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): Organization | object {
        if (Array.isArray(el)) {
            const newObj = [] as Array<Organization | object>;
            el.forEach((
                (item: any) => newObj.push(this.deserializeElement(item))
            ));
            return newObj;
        } else {
            return this.deserializeElement(el);
        }
    }
}
