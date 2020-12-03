import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class UrlToObjectConverter implements JsonCustomConvert<object> {

    serialize(val: string | object): any {
        return;
    }

    // possibly divide it
    deserialize(val: any): object {
        if (val.hasOwnProperty(Constants.SchemaPropID)) { // covers hasDiscipline
            const type = Constants.SchemaUrlValue;
            const name = val[Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[type];
            return { name, url };
        } else if (val.hasOwnProperty(Constants.SchemaUrlValue)) { // covers Place
            const type = Constants.SchemaUrlValue;
            const name = val[type][Constants.SchemaPropID][Constants.SchemaPropID];
            const url = val[type][type];
            return { name, url };
        } else {
            throw new Error(`Has not ${Constants.SchemaUrlType} type and/or ${Constants.SchemaPropID}`);
        }
    }
}
