import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "../../../admin/string-literal";
import { UpdateOntology } from "../update-ontology";

// Resource class data to be used in createResourceClass method
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
