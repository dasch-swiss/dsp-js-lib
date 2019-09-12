import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";
import { UriConverter } from "../custom-converters/uri-converter";
import { ReadValue } from "./values/read-value";

@JsonObject("ReadResource")
export class ReadResource {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    attachedToProject: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter)
    attachedToUser: string = "";

    @JsonProperty(Constants.ArkUrl, UriConverter)
    arkUrl: string = "";

    @JsonProperty(Constants.VersionArkUrl, UriConverter)
    versionArkUrl: string = "";

    resourceClassLabel?: string;

    resourceClassComment?: string;

    properties: {[index: string]: ReadValue[]} = {};

    incomingReferences: ReadResource[] = [];

    outgoingReferences: ReadResource[] = [];

    getNumberOfProperties(): number {
        return Object.keys(this.properties).length;
    }

    getNumberOfValues(property: string): number {
        if (this.properties.hasOwnProperty(property)) {
            return this.properties[property].length;
        } else {
            return 0;
        }
    }

    getValues(property: string): ReadValue[] {
        if (this.properties.hasOwnProperty(property)) {
            return this.properties[property];
        } else {
            return [];
        }
    }

}
