import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";

@JsonObject("DataManagementPlan")
export class DataManagementPlan {

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;
}
