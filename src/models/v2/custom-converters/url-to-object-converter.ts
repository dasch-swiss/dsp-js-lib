import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class UrlToObjectConverter implements JsonCustomConvert<object> {

    serialize(val: string | object): any {
        return;
    }

    // possibly divide it
    deserialize(val: any): object {
        if (val.hasOwnProperty(Constants.propID)) { // covers hasDiscipline
            const type = Constants.urlValue;
            const name = val[Constants.propID][Constants.propID];
            const url = val[type];
            return { name, url };
        } else if (val.hasOwnProperty(Constants.urlValue)) { // covers Place
            const type = Constants.urlValue;
            const name = val[type][Constants.propID][Constants.propID];
            const url = val[type][type];
            return { name, url };
        } else {
            throw new Error(`Has not ${Constants.urlType} type and/or ${Constants.propID}`);
        }
    }
}
