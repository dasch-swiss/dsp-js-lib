import { JsonConverter, JsonCustomConvert } from "json2typescript";

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

export abstract class PropertyDefinition {
    abstract id: string;

    abstract subPropertyOf: string[];

    abstract comment?: string;

    abstract label?: string;

    abstract subjectType?: string;

    abstract objectType?: string;
}
