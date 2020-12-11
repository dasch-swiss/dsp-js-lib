import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * @category Model V2 
 */ 
@JsonObject("Address")
export class Address extends BaseProjectMetadata {

    @JsonProperty(Constants.SchemaAddressLocality, String)
    addressLocality: string = "";

    @JsonProperty(Constants.SchemaPostalCode, String)
    postalCode: string = "";

    @JsonProperty(Constants.SchemaStreetAddress, String)
    streetAddress: string = "";

    constructor() {
        super(Constants.SchemaPostalAddress);
    }
}
