import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

@JsonObject("DataManagementPlan")
export class DataManagementPlan {

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL)
    url: URL = new URL(""); 

    @JsonProperty(Constants.dspRepoBase + "isAvailable", Boolean)
    isAvailable: boolean; //init it
}
