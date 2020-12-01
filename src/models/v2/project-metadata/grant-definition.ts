import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";

@JsonObject("Grant")
export class Grant {

    @JsonProperty(Constants.dspRepoBase + "hasFunder", PersonOrganizationConverter, true)
    funder?: Person | Organization = undefined;

    @JsonProperty(Constants.dspName, String, true)
    name?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasNumber", String, true)
    number?: string = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: string = undefined;
}
