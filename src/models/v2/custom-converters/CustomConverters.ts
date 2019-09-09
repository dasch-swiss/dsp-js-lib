import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { Cardinality, IHasProperty } from "../ontologies/class-definition";
import { CustomConverterUtils } from "./utils";

@JsonConverter
export class SubClassOfConverter implements JsonCustomConvert<string[]> {
    serialize(subclasses: string[]): any {
    }

    deserialize(items: any): string[] {
        const subclassOf: string[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty("@id") && CustomConverterUtils.isString(ele["@id"])) {
                subclassOf.push(ele["@id"]);
            }
        };

        if (Array.isArray(items)) {
            items.forEach(item => addItem(item));
        } else {
            addItem(items);
        }

        return subclassOf;
    }
}

@JsonConverter
export class HasCardinallityForPropertyConverter implements JsonCustomConvert<IHasProperty[]> {
    serialize(hasProperties: IHasProperty[]): any {
    }

    deserialize(items: any): IHasProperty[] {
        const hasCardForProp: IHasProperty[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty("@type") && (ele["@type"] === Constants.Restriction)) {
                let cardinality: Cardinality = Cardinality._0_n;
                if (ele.hasOwnProperty(Constants.MaxCardinality)) {
                    if (ele[Constants.MaxCardinality] === 1) {
                        cardinality = Cardinality._0_1;
                    } else {
                        throw new Error("Inconsistent value for max cardinality: " + ele[Constants.MaxCardinality]);
                    }
                } else if (ele.hasOwnProperty(Constants.MinCardinality)) {
                    if (ele[Constants.MinCardinality] === 1) {
                        cardinality = Cardinality._1_n;
                    } else if (ele[Constants.MinCardinality] === 0) {
                        cardinality = Cardinality._0_n;
                    } else {
                        throw new Error("Inconsistent value for min cardinality " + ele[Constants.MinCardinality]);
                    }
                } else if (ele.hasOwnProperty(Constants.Cardinality)) {
                    if (ele[Constants.Cardinality] === 1) {
                        cardinality = Cardinality._1;
                    } else {
                        throw new Error("Inconsistent value for cardinality " + ele[Constants.Cardinality]);
                    }
                }

                let propertyIndex: string = "";
                if (ele.hasOwnProperty(Constants.OnProperty)) {
                    const propstruct: any = ele[Constants.OnProperty];
                    if (propstruct.hasOwnProperty("@id") &&
                        CustomConverterUtils.isString(propstruct["@id"])) {
                        propertyIndex = propstruct["@id"];
                    } else {
                        throw new Error("Missing property name in cardinality");
                    }
                }

                let guiOrder: number = -1;
                if (ele.hasOwnProperty(Constants.GuiOrder)) {
                    guiOrder = ele[Constants.GuiOrder];
                    hasCardForProp.push({
                        propertyIndex: propertyIndex,
                        cardinality: cardinality,
                        guiOrder: guiOrder
                    });
                } else {
                    hasCardForProp.push({
                        propertyIndex: propertyIndex,
                        cardinality: cardinality
                    });
                }
            }

        };

        if (Array.isArray(items)) {
            items.forEach(item => addItem(item));
        } else {
            addItem(items);
        }

        return hasCardForProp;
    }
}

@JsonConverter
export class SubPropertyOfConverter implements JsonCustomConvert<string[]> {
    serialize(subproperties: string[]): any {
    }

    deserialize(item: any): string[] {
        const tmp: string[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty("@id") && CustomConverterUtils.isString(ele["@id"])) {
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
        if (item.hasOwnProperty("@id") && CustomConverterUtils.isString(item["@id"])) {
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
        if (item.hasOwnProperty("@value") && CustomConverterUtils.isString(item["@value"])) {
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
        if (item.hasOwnProperty("@value") && CustomConverterUtils.isString(item["@value"])) {
            tmp = item["@value"];
        }

        return tmp;
    }
}
