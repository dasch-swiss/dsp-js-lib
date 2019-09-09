import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "./Constants";
import { Cardinality, IHasProperty } from "./ontologies/class-definition";

@JsonConverter
export class SubClassOfConverter implements JsonCustomConvert<string[]> {
    serialize(subclasses: string[]): any {
    }

    deserialize(item: any): string[] {
        const tmp: string[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty("@id") && (typeof ele["@id"] === "string" || ele["@id"] instanceof String)) {
                tmp.push(ele["@id"]);
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
export class PropertiesListConverter implements JsonCustomConvert<IHasProperty[]> {
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

@JsonConverter
export class SubPropertyOfConverter implements JsonCustomConvert<string[]> {
    serialize(subproperties: string[]): any {
    }

    deserialize(item: any): string[] {
        const tmp: string[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty("@id") && (typeof ele["@id"] === "string" || ele["@id"] instanceof String)) {
                tmp.push(ele["@id"]);
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
export class IdConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let tmp = "";

        // TODO: check if it could be an array, too.
        if (item.hasOwnProperty("@id") && (typeof item["@id"] === "string" || item["@id"] instanceof String)) {
            tmp = item["@id"];
        }

        return tmp;
    }
}

@JsonConverter
export class UriConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let tmp = "";

        // TODO: check if it could be an array, too.
        if (item.hasOwnProperty("@value") && (typeof item["@value"] === "string" || item["@value"] instanceof String)) {
            tmp = item["@value"];
        }

        return tmp;
    }
}

@JsonConverter
export class DecimalConverter implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let tmp = "";

        // TODO: check if it could be an array, too.
        if (item.hasOwnProperty("@value") && (typeof item["@value"] === "string" || item["@value"] instanceof String)) {
            tmp = item["@value"];
        }

        return tmp;
    }
}
