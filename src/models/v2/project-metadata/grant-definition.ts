import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IUrl } from "../custom-converters/base-url-converter";
import { PersonOrganizationConverter } from "../custom-converters/person-organization-converter";
import { UrlToUrlObjectConverter } from "../custom-converters/url-to-url-object-converter";
import { BaseValue } from "../resources/values/base-value";
import { Organization } from "./organization-definition";
import { Person } from "./person-definition";

@JsonObject("Grant")
export class Grant extends BaseValue {

    @JsonProperty("@id", String)
    id: string = "";

    // @JsonProperty("@type", String)
    // type: string = Constants.DspRepoBase + "Grant";

    @JsonProperty(Constants.DspRepoBase + "hasFunder", PersonOrganizationConverter, true)
    funder?: Person | Organization | object = undefined;

    @JsonProperty(Constants.DspName, String, true)
    name?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasNumber", String, true)
    number?: string = undefined;

    @JsonProperty(Constants.DspRepoBase + "hasURL", UrlToUrlObjectConverter, true)
    url?: IUrl = undefined;
}
