import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";

@JsonObject("DataManagementPlan")
export class DataManagementPlan {

    @JsonProperty(Constants.dspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;
}
