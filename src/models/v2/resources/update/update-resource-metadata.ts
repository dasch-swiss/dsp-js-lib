import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStamp } from "../../custom-converters/date-time-stamp-converter";

@JsonObject("UpdateResourceMetadata")
export class UpdateResourceMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStamp, true)
    lastModificationDateDate?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = "";

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

    @JsonProperty(Constants.NewModificationDate, DateTimeStamp, true)
    newModificationDateDate?: string = undefined;

}
