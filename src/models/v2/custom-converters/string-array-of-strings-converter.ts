import { JsonConverter, JsonCustomConvert } from "json2typescript";

type ElementOrArrayOfElements<T> = T | T[];

/**
 * @category Internal
 */
@JsonConverter
export class StringArrayOfStringsConverter implements JsonCustomConvert<ElementOrArrayOfElements<string>> {

    // TODO: add String | URL type handling

    serialize<T>(el: ElementOrArrayOfElements<T>): any {
        console.log("SER", el);
        if (Array.isArray(el)) {
            return el as T[];
        } else {
            return el;
        }
    }

    deserialize<T>(el: any): ElementOrArrayOfElements<T> {
        console.log("deSER", el);
        if (Array.isArray(el)) {
            return el as T[];
        } else {
            return el;
        }
    }
}
