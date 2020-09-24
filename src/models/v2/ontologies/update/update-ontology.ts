import { JsonObject } from "json2typescript";
import { CreateResourceClass } from "../../../..";
import { CreateResourceProperty } from "../create/create-resource-property";
import { UpdateDeleteEntity } from "../update-delete-entity";

@JsonObject("UpdateOntology")
export class UpdateOntology<T extends CreateResourceClass | CreateResourceProperty> extends UpdateDeleteEntity {

    entity: T;

}
