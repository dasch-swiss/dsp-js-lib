import {JsonConverter, JsonCustomConvert, JsonObject, JsonProperty} from "json2typescript";
import {Constants} from '../Constants';

export enum Cardinality {
    "_1" = 0,
    "_0_1" = 1,
    "_0_n" = 2,
    "_1_n" = 3
}

export interface IHasProperty {
    propertyIndex: string;
    cardinality: Cardinality;
    guiOrder?: number;
}

@JsonConverter
class SubClassOfConverter implements JsonCustomConvert<string[]> {
    serialize(subclasses: string[]): any {
    }

    deserialize(item: any): string[] {
        const tmp: string[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty('@id') && (typeof ele['@id'] === 'string' || ele['@id'] instanceof String)) {
                tmp.push(ele['@id']);
            }
        };

        if (Array.isArray(item)) {
            item.forEach(it => addItem(it));
        } else {
            addItem(item);
        }

        return tmp;
    }
}

@JsonConverter
class PropertiesListConverter implements JsonCustomConvert<IHasProperty[]> {
    serialize(hasProperties: IHasProperty[]): any {
    }

    deserialize(items: any[]): IHasProperty[] {
        const tmp: IHasProperty[] = [];

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

export abstract class ClassDefinition {

    abstract id: string;

    abstract comment?: string;

    abstract label?: string;

    abstract subClassOf: string[];

    abstract propertiesList: IHasProperty[];
}

@JsonObject("ResourceClass")
export class ResourceClass extends ClassDefinition {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubClassOf, SubClassOfConverter)
    subClassOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.SubClassOf, PropertiesListConverter)
    propertiesList: IHasProperty[] = [];
}

@JsonObject("StandoffClass")
export class StandoffClass extends ClassDefinition {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubClassOf, SubClassOfConverter)
    subClassOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.SubClassOf, PropertiesListConverter)
    propertiesList: IHasProperty[] = [];
}