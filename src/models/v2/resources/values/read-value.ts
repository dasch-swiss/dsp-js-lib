import { JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { IdConverter, UriConverter } from "../../CustomConverters";

export class ReadValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter)
    attachedToUser: string = "";

    @JsonProperty(Constants.ArkUrl, UriConverter)
    arkUrl: string = "";

    @JsonProperty(Constants.VersionArkUrl, UriConverter)
    versionArkUrl: string = "";

    propertyLabel?: string;

    propertyComment?: string;

    property: string;

}
