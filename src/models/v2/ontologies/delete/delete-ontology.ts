import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";

@JsonObject("DeleteOntology")
export class DeleteOntology {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDateDate?: string = undefined;

    @JsonProperty(Constants.DeleteComment, String, true)
    deleteComment?: string = undefined;

}
