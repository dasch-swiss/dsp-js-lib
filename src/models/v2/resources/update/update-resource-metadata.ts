import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";

@JsonObject("UpdateResourceMetadata")
export class UpdateResourceMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDateDate?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

    @JsonProperty(Constants.NewModificationDate, DateTimeStampConverter, true)
    newModificationDateDate?: string = undefined;

}
