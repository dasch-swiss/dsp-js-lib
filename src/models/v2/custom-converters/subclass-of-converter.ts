import { JsonConverter, JsonCustomConvert } from "json2typescript";
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
