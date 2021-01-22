import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "./base-url-converter";

/**
 * @category Internal
 */
@JsonConverter
export class AdvancedUrlObjectConverter implements JsonCustomConvert<IUrl | string | [IUrl | string]> {

    serializeElement(el: IUrl | string): any {
        if (typeof el === "string") {
            return el;
        } else {
            return {
                "@type": Constants.SchemaUrlType,
                [Constants.SchemaPropID]: {
                    "@type": Constants.SchemaPropVal,
                    [Constants.SchemaPropID]: el.name
                },
                [Constants.SchemaUrlValue]: el.url
            };
        }
    }

    deserializeElement(el: any): IUrl | string {
        if (el.hasOwnProperty(Constants.SchemaPropID)) {
            const name = el[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = el[Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else {
            return el as string;
        }
    }

    serialize(el: IUrl | string | [IUrl | string]): any {
        if (Array.isArray(el)) {
            const newObj = [] as any[];
            el.forEach((
                item => newObj.push(this.serializeElement(item))
            ));
            return newObj;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): IUrl | string | [IUrl | string] {
        if (Array.isArray(el)) {
            const newObj = [] as Array<IUrl | string>;
            el.forEach(
                (item: IUrl | string) => newObj.push(this.deserializeElement(item))
            );
            return newObj as [IUrl | string];
        } else {
            return this.deserializeElement(el) as IUrl | string;
        }
    }
}
