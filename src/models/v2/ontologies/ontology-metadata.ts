import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";

@JsonObject("OntologyMetadata")
export class OntologyMetadata {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.LastModificationDate, String, true)
    lastModificationDate?: string = undefined; // TODO: adapt this once this is serialized as an object, see https://github.com/dhlab-basel/Knora/issues/1439

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    attachedToProject: string = "";
}

@JsonObject("OntologiesMetadata")
export class OntologiesMetadata {

    @JsonProperty("@graph", [OntologyMetadata])
    ontologies: OntologyMetadata[] = [];

}

