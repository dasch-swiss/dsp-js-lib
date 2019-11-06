import { JsonObject } from "json2typescript";
import { ReadWriteResource } from "../read-write-resource";
import { CreateValue } from "../values/create/create-value";
import { DeleteValue } from "../values/delete/delete-value";
import { UpdateValue } from "../values/update/update-value";

@JsonObject("UpdateResource")
export class UpdateResource<T extends UpdateValue | CreateValue | DeleteValue> extends ReadWriteResource {

    property: string;
    value: T;

}
