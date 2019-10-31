import { JsonObject } from "json2typescript";
import { CreateValue, UpdateValue } from "../../../..";
import { ReadWriteResource } from "../read-write-resource";
import { DeleteValue } from "../values/delete/delete-value";

@JsonObject("UpdateResource")
export class UpdateResource<T extends UpdateValue | CreateValue | DeleteValue> extends ReadWriteResource {

    property: string;
    value: T;

}
