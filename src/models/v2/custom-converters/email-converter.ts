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
        const hasPrefix = email["@id"].include(Constants.dsp);
        if (hasPrefix) {
            return email["@id"].replace(Constants.dsp, "");
        } else {
            throw new Error("Expected @id");
        }
    }

}
