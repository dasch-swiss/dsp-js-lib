import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Organization } from "../project-metadata/organization";

/**
 * @category Internal
 */
@JsonConverter
export class OrganizationIdConverter implements JsonCustomConvert<Organization | object> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serializeElement(el: Organization | object): any {
        if (el.hasOwnProperty("name")) {
            return OrganizationIdConverter.jsonConvert.serializeObject(el, Organization);
        } else if (el.hasOwnProperty("id") && !el.hasOwnProperty("name")) {
            return {
                "@id": (el as { [index: string]: string })["id"]
            };
        } else {
            throw new Error("Expected Organization object type or reference with id key.");
        }
    }

    deserializeElement(el: any): Organization | object {
        if (el.hasOwnProperty(Constants.DspHasName)) {
            return OrganizationIdConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@id") && !el.hasOwnProperty(Constants.DspHasName)) {
            return {
                id: (el as { [index: string]: string })["@id"]
            };
        } else {
            throw new Error(`Expected ${Constants.DspOrganization} object type or reference with @id key`);
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
