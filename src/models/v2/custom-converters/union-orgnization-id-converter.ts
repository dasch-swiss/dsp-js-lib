import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, PropertyMatchingRule, ValueCheckingMode } from "json2typescript";
import { IId } from "../../../interfaces/models/v2/project-metadata-interfaces";
import { Constants } from "../Constants";
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
        return el.map(
            (item: Organization | object) => this.serializeElement(item)
        );
    }

    deserialize(el: any): Array<Organization | IId> {
        if (Array.isArray(el)) {
            return el.map(
                item => this.deserializeElement(item)
            );
        } else {
            const newArr = [] as Array<Organization | IId>;
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
            return { id: el["@id"] };
        } else {
            throw new Error(`Deserialization Error: expected an object with property @type equals to 
                ${Constants.DspOrganization} or an object with @id key.`);
        }
    }
}
