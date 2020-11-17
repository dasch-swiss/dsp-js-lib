import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { Person } from "./person-definition";

@JsonObject("Attribution")
export class Attribution {

    @JsonProperty(Constants.dspRepoBase + "hasRole", String)
    role: string = "";

    @JsonProperty(Constants.dspRepoBase + "agent", Person)
    agent: Person = new Person();
}
