import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";
import { BaseValue } from "../resources/values/base-value";

@JsonObject("Attribution")
export class Attribution extends BaseValue {

    // @JsonProperty("@type", String)
    // type?: string = Constants.ProvAttribution;

    @JsonProperty(Constants.DspRepoBase + "hasRole", String)
    role: string = "";

    @JsonProperty(Constants.ProvAgent, IdConverter) //convert to Person base on @id
    agent: string = "";
}
