import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";
import { IdConverter } from "../../custom-converters/id-converter";

@JsonObject("CreateOntologyResponse")
export class CreateOntologyResponse {

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    projectIri: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter)
    lastModificationDate: string = "";

}
