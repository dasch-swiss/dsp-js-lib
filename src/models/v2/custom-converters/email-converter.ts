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
        const hasPrefix = email.include(Constants.dsp);
        if (hasPrefix) {
            return email.replace(Constants.dsp, "");
        } else {
            throw new Error("Expected @id");
        }
    }

}
