import { JsonObject, JsonProperty } from "json2typescript";
import { IResourceClassAndPropertyDefinitions } from "../../../cache/OntologyCache";
import { Constants } from "../Constants";
import { DateTimeStamp } from "../custom-converters/date-time-stamp-converter";
import { IdConverter } from "../custom-converters/id-converter";
import { UriConverter } from "../custom-converters/uri-converter";
import { TypeGuard } from "./type-guard";
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

    entityInfo: IResourceClassAndPropertyDefinitions;

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

    getValueType(property: string): string | false {
        if (this.entityInfo.properties.hasOwnProperty(property) && this.entityInfo.properties[property].objectType !== undefined) {
            return this.entityInfo.properties[property].objectType as string;
        } else {
            return false;
        }
    }

    getValues(property: string): ReadValue[] {
        if (this.properties.hasOwnProperty(property)) {
            return this.properties[property];
        } else {
            return [];
        }
    }

    getValuesAs<T extends ReadValue>(property: string, valueType: TypeGuard.Constructor<T>): T[] {

        return this.getValues(property).map(
            val => {
                if (TypeGuard.typeGuard(val, valueType)) {
                    return (val as T);
                } else {
                    throw new Error("Cannot cast to type " + valueType);
                }
            }
        );
    }

}
