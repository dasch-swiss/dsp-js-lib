import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

@JsonObject("DataManagementPlan")
export class DataManagementPlan {

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL, true)
    url?: URL = undefined;

    @JsonProperty(Constants.dspRepoBase + "isAvailable", Boolean, true)
    isAvailable?: boolean = undefined;
}
