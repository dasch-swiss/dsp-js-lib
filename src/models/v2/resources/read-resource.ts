import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateTimeStamp } from "../custom-converters/date-time-stamp-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { UriConverter } from "../custom-converters/uri-converter";
import { ResourcesConversionUtil } from "./ResourcesConversionUtil";
import { ReadValue } from "./values/read-value";

@JsonObject("ReadResource")
export class ReadResource {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    attachedToProject: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter)
    attachedToUser: string = "";

    @JsonProperty(Constants.HasPermissions, String)
    hasPermissions: string = "";

    @JsonProperty(Constants.UserHasPermission, String)
    userHasPermission: string = "";

    @JsonProperty(Constants.ArkUrl, UriConverter)
    arkUrl: string = "";

    @JsonProperty(Constants.VersionArkUrl, UriConverter)
    versionArkUrl: string = "";

    @JsonProperty(Constants.CreationDate, DateTimeStamp)
    creationDate: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStamp, true)
    lastModificationDateDate?: string = undefined;

    resourceClassLabel?: string;

    resourceClassComment?: string;

    properties: { [index: string]: ReadValue[] } = {};

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

    getValuesAs<T>(property: string, valueType: ResourcesConversionUtil.Constructor<T>): T[] {

        return this.getValues(property).map(
            val => {
                if (ResourcesConversionUtil.typeGuard(val, valueType)) {
                    return (val as T);
                } else {
                    throw new Error("Cannot cast to type " + valueType);
                }
            }
        );
    }

}
