import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class NullablePropertyConverter implements JsonCustomConvert<any> {
    serialize(prop: any): any {

        console.log(prop);

        if (prop === null) {
            return null;
        } else {
            return prop;
        }
    }

    deserialize(item: any): any {}

}
