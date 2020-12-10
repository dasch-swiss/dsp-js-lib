import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

/**
 * @category Internal
 */
@JsonConverter
export class EmailConverter implements JsonCustomConvert<string> {

    serialize(email: string): any {
        return {
            "@id": Constants.Dsp + email
        };
    }
    
    deserialize(email: any): string {
        if (!email.hasOwnProperty("@id")) throw new Error("Has not expected @id");

        const hasPrefix = email.hasOwnProperty("@id") && email["@id"].startsWith(Constants.Dsp);

        if (hasPrefix) {
            return email["@id"].replace(Constants.Dsp, "");
        } else {
            throw new Error("Expected @id");
        }
    }
}
