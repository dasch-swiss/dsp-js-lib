import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { BaseProjectMetadata } from "./base-project-metadata";

 /** 
  * @category Model V2 
  */ 
@JsonObject("Address")
export class Address extends BaseProjectMetadata {

    @JsonProperty("https://schema.org/" + "addressLocality", String)
    addressLocality: string = "";

    @JsonProperty("https://schema.org/" + "postalCode", String)
    postalCode: string = "";

    @JsonProperty("https://schema.org/" + "streetAddress", String)
    streetAddress: string = "";

    constructor() {
        super(Constants.SchemaBase + "/PostalAddress");
    }
}
