import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStamp } from "../../custom-converters/date-time-stamp-converter";

@JsonObject("DeleteResource")
export class DeleteResource {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStamp, true)
    lastModificationDateDate?: string = undefined;

    @JsonProperty(Constants.DeleteComment, String, true)
    deleteComment?: string = undefined;

}
