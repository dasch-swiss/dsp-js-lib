import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { ClassDefinition } from "./class-definition";
import { PropertyDefinition } from "./property-definition";

@JsonObject("ReadOntology")
export class ReadOntology {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.LastModificationDate, String, true)
    lastModificationDate?: string = undefined; // TODO: adapt this once this is serialized as an object, see https://github.com/dhlab-basel/Knora/issues/1439

    properties: { [index: string]: PropertyDefinition } = {};
    classes: { [index: string]: ClassDefinition } = {};

    dependsOnOntologies: Set<string>;

}
