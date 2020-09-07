import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";
import { StringLiteralToStringLiteralArrayConverter } from "../../custom-converters/string-literal-to-string-literal-array-converter";
import { SubClassOfConverter } from "../../custom-converters/subclass-of-converter";
import { StringLiteralV2 } from "../../string-literal-v2";
import { IdConverter } from "../../custom-converters/id-converter";


// Resource property data as part of CreateResourcePropertyPayload
@JsonObject("NewResourceProperty")
export class NewResourceProperty {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String, true)
    type: string = Constants.ObjectProperty;

    @JsonProperty("subjectType", IdConverter, true)
    subjectType: string = "";

    @JsonProperty("objectType", IdConverter)
    objectType: string = "";

    @JsonProperty(Constants.Label, StringLiteralToStringLiteralArrayConverter)
    label: StringLiteralV2[] = [];

    @JsonProperty(Constants.Comment, StringLiteralToStringLiteralArrayConverter)
    comment: StringLiteralV2[] = [];

    @JsonProperty(Constants.SubPropertyOf, SubClassOfConverter)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.SalsahGui, IdConverter, true)
    guiElement: string = "";

    @JsonProperty("guiAttributes", [String], true)
    guiAttributes: string[] = [];

}

// Resource property data payload: This will be sent to the api
@JsonObject("CreateResourcePropertyPayload")
export class CreateResourcePropertyPayload {

    // ontology's iri
    @JsonProperty("@id", String)
    id: string = "";

    // ontology's last modification data
    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter)
    lastModificationDate: string;

    @JsonProperty("@type", String)
    type: string = Constants.Ontology;

    @JsonProperty("@graph", [NewResourceProperty])
    resProperty: NewResourceProperty[] = [];
}