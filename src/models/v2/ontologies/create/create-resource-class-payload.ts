import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";
import { StringLiteralToStringLiteralArrayConverter } from "../../custom-converters/string-literal-to-string-literal-array-converter";
import { SubClassOfConverter } from "../../custom-converters/subclass-of-converter";
import { StringLiteralV2 } from "../../string-literal-v2";


// Resource class data as part of CreateResourceClassPayload
@JsonObject("NewResourceClass")
export class NewResourceClass {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String, true)
    type: string = Constants.Class;

    @JsonProperty(Constants.Label, StringLiteralToStringLiteralArrayConverter)
    label: StringLiteralV2[] = [];

    @JsonProperty(Constants.Comment, StringLiteralToStringLiteralArrayConverter)
    comment: StringLiteralV2[] = [];

    @JsonProperty(Constants.SubClassOf, SubClassOfConverter)
    subClassOf: string[] = [];
}

// Resource class data payload: This will be sent to the api
@JsonObject("CreateResourceClassPayload")
export class CreateResourceClassPayload {

    // ontology's iri
    @JsonProperty("@id", String)
    id: string = "";

    // ontology's last modification data
    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter)
    lastModificationDate: string;

    @JsonProperty("@type", String)
    type: string = Constants.Ontology;

    @JsonProperty("@graph", [NewResourceClass])
    resClass: NewResourceClass[] = [];
}