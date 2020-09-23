import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateTimeStampConverter } from "../custom-converters/date-time-stamp-converter";

@JsonObject("UpdateDeleteOntology")
export abstract class UpdateDeleteOntology {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDate: string;

}
