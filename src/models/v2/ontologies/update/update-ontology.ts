import { JsonObject } from "json2typescript";
import { UpdateDeleteOntology } from "../update-delete-ontology";

/**
 * UpdateOntology class can be used whenever the ontology,
 * a resource class or a resource property has to be updated (incl. delete).
 * It can be used to update
 *   - resource class: res class id and lastModificationDate
 *   - resource property: res prop id and lastModificationDate
 */
@JsonObject("UpdateOntology")
export class UpdateOntology extends UpdateDeleteOntology {

}
