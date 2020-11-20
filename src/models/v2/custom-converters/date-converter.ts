import { JsonConverter, JsonCustomConvert } from "json2typescript";
import { Constants } from "../Constants";

@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> { // or just string?

    serialize(dateObject: Date): any {
        return {
            "@type": Constants.XsdDate,
            "@value": dateObject
        };
    }
    
    deserialize(dateObject: any): Date {
        if (!dateObject.hasOwnProperty("@type") || dateObject["@type"] !== Constants.XsdDate) throw new Error("Not of expected type xsd:date");

        return new Date(dateObject["@value"]);
    }
}
