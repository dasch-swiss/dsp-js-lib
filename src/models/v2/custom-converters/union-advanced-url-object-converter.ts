import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../project-metadata/metadata-interfaces";

/**
 * @category Internal
 */
@JsonConverter
export class UnionAdvancedUrlObjectConverter implements JsonCustomConvert<IUrl | string | Array<IUrl | string>> {

    serialize(el: IUrl | string | Array<IUrl | string>): object | string {
        if (Array.isArray(el)) {
            const newArr = [] as any[];
            el.forEach(
                (item: IUrl | string) => newArr.push(this.serializeElement(item))
            );
            return newArr;
        } else {
            return this.serializeElement(el);
        }
    }

    deserialize(el: any): IUrl | string | Array<IUrl | string> {
        if (Array.isArray(el)) {
            const newArr = [] as Array<IUrl | string>;
            el.forEach(
                (item: any) => newArr.push(this.deserializeElement(item))
            );
            return newArr;
        } else {
            return this.deserializeElement(el);
        }
    }

    private serializeElement(el: IUrl | string): object | string {
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

    private deserializeElement(el: any): IUrl | string {
        if (el.hasOwnProperty(Constants.SchemaPropID)) {
            const name = el[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = el[Constants.SchemaUrlValue];
            return { name, url } as IUrl;
        } else {
            return el as string;
        }
    }
}
