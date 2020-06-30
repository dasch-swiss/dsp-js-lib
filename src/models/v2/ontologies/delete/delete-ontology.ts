import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";

@JsonObject("DeleteOntology")
export class DeleteOntology {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDate?: string = undefined;

}
