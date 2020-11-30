import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { IdConverter } from "../../custom-converters/id-converter";

/**
 * @category Model
 */
@JsonObject("CreateOntology")
export class CreateOntology {

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    attachedToProject: string = "";

    @JsonProperty(Constants.OntologyName, String)
    name: string = "";

}
