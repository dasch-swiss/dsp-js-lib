import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";
import { BaseProjectMetadata } from "./base-project-metadata";

 /** 
  * @category Model V2 
  */ 
@JsonObject("Attribution")
export class Attribution extends BaseProjectMetadata {

    @JsonProperty(Constants.DspRepoBase + "hasRole", String)
    role: string = "";

    @JsonProperty(Constants.ProvAgent, IdConverter) //convert to Person base on @id
    agent: string = "";

    constructor() {
        super(Constants.ProvAttribution);
    }
}
