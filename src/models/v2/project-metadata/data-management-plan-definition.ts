import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseProjectMetadata } from "./base-project-metadata";

@JsonObject("DataManagementPlan")
export class DataManagementPlan extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;

    @JsonProperty(Constants.DspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;

    constructor() {
        super(Constants.DspRepoBase + "DataManagementPlan");
    }
}
