import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { HasCardinalityForPropertyConverter } from "../../custom-converters/has-cardinality-for-property-converter";
import { IHasProperty } from "../class-definition";
import { UpdateDeleteEntity } from "../update-delete-entity";

/**
 * @category Model
 */
@JsonObject("UpdateOntologyResourceClassCardinality")
export class UpdateOntologyResourceClassCardinality extends UpdateDeleteEntity {

    @JsonProperty("@type", String)
    readonly type = Constants.Ontology;

    @JsonProperty("@graph", HasCardinalityForPropertyConverter)
    cardinalities: IHasProperty[] = [];

}
