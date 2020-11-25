import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class UrlToObjectConverter implements JsonCustomConvert<object> {

    serialize(val: string | object): any {
        return;
    }

    deserialize(val: any): object {
        if (val.hasOwnProperty(Constants.propID)) { // covers hasDiscipline
            const type = Constants.urlType.toLocaleLowerCase();
            const name = val[Constants.propID][Constants.propID];
            const url = val[type];
            console.log(name, url);
            return { name, url };
        } else if (val[Constants.urlType].hasOwnProperty(Constants.propID)) { // covers Place
            const type = Constants.urlType.toLocaleLowerCase();
            const name = val[type][Constants.propID][Constants.propID];
            const url = val[type][type];
            console.log(name, url);
            return { name, url };
        } else {
            throw new Error(`Has not ${Constants.urlType} type and/or ${Constants.propID}`);
        }
    }
}
