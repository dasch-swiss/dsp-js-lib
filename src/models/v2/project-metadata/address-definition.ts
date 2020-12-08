import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { BaseValue } from "../resources/values/base-value";

@JsonObject("Address")
export class Address extends BaseValue {

    // @JsonProperty("@type", String)
    // readonly type: string = Constants.SchemaBase + "/PostalAddress";

    @JsonProperty("https://schema.org/" + "addressLocality", String)
    addressLocality: string = "";

    @JsonProperty("https://schema.org/" + "postalCode", String)
    postalCode: string = "";

    @JsonProperty("https://schema.org/" + "streetAddress", String)
    streetAddress: string = "";
}
