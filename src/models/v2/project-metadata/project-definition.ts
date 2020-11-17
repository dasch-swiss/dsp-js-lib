import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";

@JsonObject("Project")
export class Project {

    @JsonProperty(Constants.dspRepoBase + "hasAbstract", String)
    abstract: string = "";
   
}
