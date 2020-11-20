import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { StringUrlConverter } from "../custom-converters/string-url-converter";

@JsonObject("DataManagementPlan")
export class DataManagementPlan {

    @JsonProperty(Constants.dspRepoBase + "hasURL", StringUrlConverter, true)
    url?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;
}
