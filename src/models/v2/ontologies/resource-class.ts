import {JsonConverter, JsonCustomConvert, JsonObject, JsonProperty} from "json2typescript";
import {PropertyClass} from "./property-class";
import {Constants} from '../Constants';

export enum Cardinality {
    "_1" = 0,
    "_0_1" = 1,
    "_0_n" = 2,
    "_1_n" = 3
}

export interface HasProperty {
    propertyIndex: string;
    cardinality: Cardinality;
    guiOrder?: number;
}

@JsonConverter
class SubClassOfConverter implements JsonCustomConvert<string[]> {
    serialize(description: string[]): any {
        const res: Array<{value: string, language: string}> = [];
        /*
        for (const key in description) {
            if (description.hasOwnProperty(key)) {
                res.push({language: key, value: description[key]});
            }
        }
        */
        return res;
    }

    deserialize(items: any[]): string[] {
        const tmp: string[] = [];

        // ToDo: if items is a single item, not an array
        for (const item of items) {
            if (item.hasOwnProperty("@id") && (typeof item["@id"] === "string" || item["@id"] instanceof String)) {
                 tmp.push(item["@id"]);
            }
        }
        return tmp;
    }
}

@JsonConverter
class PropertiesListConverter implements JsonCustomConvert<HasProperty[]> {
    serialize(hasProperties: HasProperty[]): any {
        const res: any = {};
        /*
        for (const key in description) {
            if (description.hasOwnProperty(key)) {
                res.push({language: key, value: description[key]});
            }
        }
        */
        return res;
    }

    deserialize(items: any[]): HasProperty[] {
        const tmp: HasProperty[] = [];

        for (const item of items) {
            if (item.hasOwnProperty("@type") && (item["@type"] === Constants.Restriction)) {
                let cardinality: Cardinality = Cardinality._0_n;
                if (item.hasOwnProperty(Constants.MaxCardinality)) {
                    if (item[Constants.MaxCardinality] === 1) {
                        cardinality = Cardinality._0_1;
                    } else {
                        console.error("Inconsistent cardinality!"); // ToDo: better error message
                    }
                } else if (item.hasOwnProperty(Constants.MinCardinality)) {
                    if (item[Constants.MinCardinality] === 1) {
                        cardinality = Cardinality._1_n;
                    } else if (item[Constants.MinCardinality] === 0) {
                        cardinality = Cardinality._0_n;
                    } else {
                        console.error("Inconsistent cardinality!"); // ToDo: better error message
                    }
                } else if (item.hasOwnProperty(Constants.Cardinality)) {
                    if (item[Constants.Cardinality] === 1) {
                        cardinality = Cardinality._1;
                    } else {
                        console.error("Inconsistent cardinality!"); // ToDo: better error message
                    }
                }

                let propertyIndex: string = "";
                if (item.hasOwnProperty(Constants.OnProperty)) {
                    const propstruct: any = item[Constants.OnProperty];
                    if (propstruct.hasOwnProperty("@id") &&
                        (typeof propstruct["@id"] === "string" || propstruct["@id"] instanceof String)) {
                        propertyIndex = propstruct["@id"];
                    } else {
                        console.error("Missing property name!"); // ToDo: better error message
                    }
                }

                let guiOrder: number = -1;
                if (item.hasOwnProperty(Constants.GuiOrder)) {
                    guiOrder = item[Constants.GuiOrder];
                    tmp.push({
                        propertyIndex: propertyIndex,
                        cardinality: cardinality,
                        guiOrder: guiOrder
                    });
                } else {
                    tmp.push({
                        propertyIndex: propertyIndex,
                        cardinality: cardinality
                    });
                }
            }
        }
        return tmp;
    }
}

@JsonObject("ResourceClass")
export class ResourceClass {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubClassOf, SubClassOfConverter)
    subClassOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string;

    @JsonProperty(Constants.Label, String, true)
    label?: string;

    @JsonProperty(Constants.SubClassOf, PropertiesListConverter)
    propertiesList: HasProperty[] = [];
}
