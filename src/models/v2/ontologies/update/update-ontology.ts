import { JsonObject, JsonProperty } from "json2typescript";
import { CreateResourceProperty } from "../create/create-resource-property";
import { UpdateDeleteEntity } from "../update-delete-entity";
import { CreateResourceClass } from "../create/create-resource-class";
import { Constants } from "../../Constants";
import { UpdateOntologyResourceClassCardinality } from "./update-ontology-resource-class-cardinality";

/**
 * @category Model V2
 */
@JsonObject("UpdateOntology")
export class UpdateOntology<T extends CreateResourceClass | CreateResourceProperty | UpdateOntologyResourceClassCardinality> extends UpdateDeleteEntity {

    @JsonProperty("@type", String)
    type: string = Constants.Ontology;

    entity: T;

}
