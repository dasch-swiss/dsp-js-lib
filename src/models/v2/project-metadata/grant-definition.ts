import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { Person } from "./person-definition";

@JsonObject("Grant")
export class Grant {

    @JsonProperty(Constants.dspRepoBase + "hasFunder", Person) //Person | Organization
    funder: Person = new Person();

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasNumber", String)
    number: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL)
    url: URL = new URL(""); 
}
