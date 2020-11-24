import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class EmailConverter implements JsonCustomConvert<string> {

    serialize(email: string): any {
        return {
            "@id": email
        };
    }
    
    deserialize(email: any): string {
        if (!email.hasOwnProperty("@id")) throw new Error("Has not expected @id");

        const hasPrefix = email.hasOwnProperty("@id") && email["@id"].startsWith(Constants.dsp);

        if (hasPrefix) {
            return email["@id"].replace(Constants.dsp, "");
        } else {
            throw new Error("Expected @id");
        }
    }
}
