import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";
import { Person } from "./person-definition";

@JsonObject("Attribution")
export class Attribution {

    @JsonProperty(Constants.DspRepoBase + "hasRole", String)
    role: string = "";

    @JsonProperty(Constants.ProvAgent, IdConverter) //convert to Person base on @id
    agent: string = "";
}
