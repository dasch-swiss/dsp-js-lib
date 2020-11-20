import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

// export interface UrlObj {
//     name: string;
//     url: string;
// }

@JsonConverter
export class UrlToObjectConverter implements JsonCustomConvert<object> {

    serialize(val: string | object): any {
        return;
    }

    deserialize(val: any): object {
        if (val.hasOwnProperty(Constants.propID) || val[Constants.urlType].hasOwnProperty(Constants.propID)) {
            const name = val[Constants.urlType][Constants.propID][Constants.propID];
            const url = val[Constants.urlType][Constants.urlType];
            return { name, url };
        } else {
            throw new Error(`Has not ${Constants.urlType} type and/or ${Constants.propID}`);
        }
    }
}
