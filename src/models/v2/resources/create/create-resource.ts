import { JsonProperty } from "json2typescript";
import { CreateValue } from "../../../..";
import { Constants } from "../../Constants";
import { DateTimeStamp } from "../../custom-converters/date-time-stamp-converter";
import { IdConverter } from "../../custom-converters/id-converter";

export class CreateResource {

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.HasPermissions, String, true)
    hasPermissions?: string = undefined;

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    attachedToProject: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter, true)
    attachedToUser?: string = undefined;

    @JsonProperty(Constants.CreationDate, DateTimeStamp, true)
    creationDate?: string = undefined;

    properties: { [index: string]: CreateValue[] } = {};

}
