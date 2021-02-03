import { JsonConvert, JsonConverter, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { DataManagementPlan } from "../project-metadata/data-management-plan";
import { Dataset } from "../project-metadata/dataset";
import { Grant } from "../project-metadata/grant";
import { Organization } from "../project-metadata/organization";
import { Person } from "../project-metadata/person";
import { SingleProject } from "../project-metadata/single-project";

export type MetadataClasses = Dataset | SingleProject | Person | Organization | Grant | DataManagementPlan;

/**
 * @category Internal
 */
@JsonConverter
export class UnionMetadataConverter implements JsonCustomConvert<MetadataClasses[]> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(el: MetadataClasses[]): any {
        const newArr = [] as any[];
        el.forEach(
            (item: MetadataClasses) => newArr.push(this.serializeElement(item))
        );
        return newArr;
    }

    deserialize(el: any): MetadataClasses[] {
        const newArr = [] as MetadataClasses[];
        el.forEach(
            (item: any) => newArr.push(this.deserializeElement(item))
        );
        return newArr;
    }

    private serializeElement(el: MetadataClasses): any {
        if (el.hasOwnProperty("type") && el["type"] === Constants.DspDataset) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, Dataset);
        } else if (el.hasOwnProperty("type") && el["type"] === Constants.DspProject) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, SingleProject);
        } else if (el.hasOwnProperty("type") && el["type"] === Constants.DspPerson) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, Person);
        } else if (el.hasOwnProperty("type") && el["type"] === Constants.DspOrganization) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, Organization);
        } else if (el.hasOwnProperty("type") && el["type"] === Constants.DspGrant) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, Grant);
        } else if (el.hasOwnProperty("type") && el["type"] === Constants.DspDataManagementPlan) {
            return UnionMetadataConverter.jsonConvert.serializeObject(el, DataManagementPlan);
        } else {
            throw new Error(`Serialization Error: expected Dataset, SingleProject, Person, 
                Organization, Grant or DataManagementPlan object type. Instead got ${typeof el}.`);
        }
    }

    private deserializeElement(el: any): MetadataClasses {
        if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspDataset) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, Dataset);
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspProject) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, SingleProject);
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspPerson) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, Person);
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspOrganization) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, Organization);
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspGrant) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, Grant);
        } else if (el.hasOwnProperty("@type") && el["@type"] === Constants.DspDataManagementPlan) {
            return UnionMetadataConverter.jsonConvert.deserializeObject(el, DataManagementPlan);
        } else {
            throw new Error(`Deserialization Error: expected object with @type property equals to 
                ${Constants.DspDataset}, ${Constants.DspProject}, ${Constants.DspPerson}, 
                ${Constants.DspOrganization}, ${Constants.DspGrant} or ${Constants.DspDataManagementPlan}.`);
        }
    }
}
