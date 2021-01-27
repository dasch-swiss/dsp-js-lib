import { JsonConverter, JsonCustomConvert } from "json2typescript";

/**
 * @category Internal
 */
@JsonConverter
export class StringArrayOfStringsConverter implements JsonCustomConvert<string[] | string> {

    serialize(el: string[] | string): any {
        if (Array.isArray(el)) {
            return el as string[];
        } else {
            return el;
        }
    }

    deserialize(el: any): string[] | string {
        if (Array.isArray(el)) {
            return el as string[];
        } else {
            return el;
        }
    }
}
