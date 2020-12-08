import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseValue } from "../resources/values/base-value";

@JsonObject("DataManagementPlan")
export class DataManagementPlan extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

    // @JsonProperty("@type", String)
    // type: string = Constants.DspRepoBase + "DataManagementPlan";

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;

    @JsonProperty(Constants.DspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;
}
