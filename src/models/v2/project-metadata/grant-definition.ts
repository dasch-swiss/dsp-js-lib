import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";

@JsonObject("Grant")
export class Grant {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspRepoBase + "hasFunder", PersonOrganizationConverter, true)
    funder?: Person | Organization | object = undefined;

    @JsonProperty(Constants.DspName, String, true)
    name?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasNumber", String, true)
    number?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;
}
