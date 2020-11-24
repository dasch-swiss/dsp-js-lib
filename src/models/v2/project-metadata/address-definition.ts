import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Address")
export class Address {

    @JsonProperty("https://schema.org/" + "addressLocality", String)
    addressLocality: string = "";

    @JsonProperty("https://schema.org/" + "postalCode", String)
    postalCode: string = "";

    @JsonProperty("https://schema.org/" + "streetAddress", String)
    streetAddress: string = "";
}
