import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { EmailConverter } from "../custom-converters/email-converter";
import { Address } from "./address-definition";
import { BaseProjectMetadata } from "./base-project-metadata";

/** 
 * Base for Person and Organization type
 * @category Model V2 
 */ 
@JsonObject("BaseFunder")
export class BaseFunder extends BaseProjectMetadata {
    
    @JsonProperty("@id", String)
    id: string = "";
    
    @JsonProperty(Constants.DspHasAddress, Address, true)
    address?: Address = undefined;

    @JsonProperty(Constants.DspHasEmail, EmailConverter, true)
    email?: string = undefined; //should the email be actually @id as in JSON-LD?
}