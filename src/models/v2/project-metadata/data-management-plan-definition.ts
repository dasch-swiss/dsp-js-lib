import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UrlToStringConverter } from "../custom-converters/url-to-string-converter";

@JsonObject("DataManagementPlan")
export class DataManagementPlan {

    @JsonProperty(Constants.dspRepoBase + "hasURL", UrlToStringConverter, true)
    url?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;
}
