import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "../../../admin/string-literal";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";
import { IdConverter } from "../../custom-converters/id-converter";
import { StringLiteralToStringLiteralArrayConverter } from "../../custom-converters/string-literal-to-string-literal-array-converter";
import { SubClassOfConverter } from "../../custom-converters/subclass-of-converter";
import { StringLiteralV2 } from "../../string-literal-v2";
import { UpdateOntology } from "../update-ontology";

@JsonObject("ResourceClassProperty") 
export class ResourceClassProperty {

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty("cardinality", String)
    cardinality: string = "";

    @JsonProperty(Constants.OnProperty, IdConverter)
    onProperty: string = "";

    @JsonProperty(Constants.GuiOrder, Number)
    guiOrder: number = 0;
   
}

// Resource class data to be used in creataResourceClass method
@JsonObject("CreateResourceClass")
export class CreateResourceClass {

    @JsonProperty("ontology", UpdateOntology)
    ontology: UpdateOntology = new UpdateOntology();

    @JsonProperty("name", String)
    name: string = "";

    @JsonProperty("labels", [StringLiteral])
    labels: StringLiteral[] = [];

    @JsonProperty("comments", [StringLiteral], true)
    comments: StringLiteral[] = [];

    @JsonProperty("subClassOf", [String])
    subClassOf: string[] = [];
}

// Resource class data as part of CreateResourceClassPayload
@JsonObject("ResourceClass")
export class ResourceClass {
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

    @JsonProperty("@graph", [ResourceClass])
    resClass: ResourceClass[] = [];
}


