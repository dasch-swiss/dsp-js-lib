import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { IUrl } from "../project-metadata/metadata-interfaces";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * @category Model V2 
 */ 
@JsonObject("DataManagementPlan")
export class DataManagementPlan extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspHasURL, UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;

    @JsonProperty(Constants.DspIsAvailable, Boolean, true)
    isAvailable?: boolean = undefined;

    constructor() {
        super(Constants.DspDataManagementPlan);
    }
}
