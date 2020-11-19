import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";

@JsonObject("Grant")
export class Grant {

    @JsonProperty(Constants.dspRepoBase + "hasFunder", PersonOrganizationConverter, true)
    funder?: Person | Organization = undefined;

    @JsonProperty(Constants.dspRepoBase + "hasName", String)
    name?: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasNumber", String)
    number?: string = "";

    @JsonProperty(Constants.dspRepoBase + "hasURL", URL)
    url?: URL = new URL("");
}
