import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../../Constants";
import { DateTimeStamp } from "../../../custom-converters/date-time-stamp-converter";
import { IdConverter } from "../../../custom-converters/id-converter";
import { UriConverter } from "../../../custom-converters/uri-converter";
import { BaseValue } from "../base-value";
import { ReadWriteValue } from "../read-write-value";

@JsonObject("ReadValue")
export class ReadValue extends ReadWriteValue {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter)
    attachedToUser: string = "";

    @JsonProperty(Constants.ArkUrl, UriConverter)
    arkUrl: string = "";

    @JsonProperty(Constants.VersionArkUrl, UriConverter)
    versionArkUrl: string = "";

    @JsonProperty(Constants.ValueCreationDate, DateTimeStamp)
    valueCreationDate: string = "";

    @JsonProperty(Constants.HasPermissions, String)
    hasPermissions: string = "";

    @JsonProperty(Constants.UserHasPermission, String)
    userHasPermission: string = "";

    @JsonProperty(Constants.ValueHasUUID, String)
    uuid: string = "";

    propertyLabel?: string;

    propertyComment?: string;

    property: string;

    strval?: string;

    constructor(id?: string,
                type?: string,
                attachedToUser?: string,
                arkUrl?: string,
                versionArkUrl?: string,
                valueCreationDate?: string,
                hasPermissions?: string,
                userHasPermission?: string,
                uuid?: string,
                propertyLabel?: string,
                propertyComment?: string,
                property?: string,
                strval?: string,
                valueHasComment?: string) {

        super();

        if (id !== undefined) this.id = id;
        if (type !== undefined) this.type = type;
        if (attachedToUser !== undefined) this.attachedToUser = attachedToUser;
        if (arkUrl !== undefined) this.arkUrl = arkUrl;
        if (versionArkUrl !== undefined) this.versionArkUrl = versionArkUrl;
        if (valueCreationDate !== undefined) this.valueCreationDate = valueCreationDate;
        if (hasPermissions !== undefined) this.hasPermissions = hasPermissions;
        if (userHasPermission !== undefined) this.userHasPermission = userHasPermission;
        if (uuid !== undefined) this.uuid = uuid;
        if (propertyLabel !== undefined) this.propertyLabel = propertyLabel;
        if (propertyComment !== undefined) this.propertyComment = propertyLabel;
        if (property !== undefined) this.property = property;
        if (strval !== undefined) this.strval = strval;
        if (valueHasComment !== undefined) this.valueHasComment = valueHasComment;

    }
}
