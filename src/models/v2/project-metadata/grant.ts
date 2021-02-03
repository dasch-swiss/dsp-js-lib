import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { UnionPersonOrganizationIdConverter } from "../custom-converters/union-person-organization-id-converter";
import { UnionUrlStringConverter } from "../custom-converters/union-url-string-converter";
import { IId, IUrl } from "../project-metadata/metadata-interfaces";
import { BaseProjectMetadata } from "./base-project-metadata";
import { Organization } from "./organization";
import { Person } from "./person";

/** 
 * @category Model V2 
 */ 
@JsonObject("Grant")
export class Grant extends BaseProjectMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.DspHasFunder, UnionPersonOrganizationIdConverter)
    funder: Person[] | Organization[] | IId[] = [];

    @JsonProperty(Constants.DspHasName, String, true)
    name?: string = undefined;

    @JsonProperty(Constants.DspHasNumber, String, true)
    number?: string = undefined;

    @JsonProperty(Constants.DspHasURL, UnionUrlStringConverter, true)
    url?: IUrl = undefined;

    constructor() {
        super(Constants.DspGrant);
    }
}
