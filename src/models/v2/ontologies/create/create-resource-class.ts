import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "../../../admin/string-literal";
import { UpdateOntology } from "../update/update-ontology";

export class CreateResourceClass {

    name: string = "";

    labels: StringLiteral[] = [];

    comments: StringLiteral[] = [];

    subClassOf: string[] = [];
}
