import { JsonObject } from "json2typescript";
import { ReadWriteResource } from "../read-write-resource";
import { DeleteValue } from "../values/delete/delete-value";
import { ReadWriteValue } from "../values/read-write-value";

@JsonObject("UpdateResource")
export class UpdateResource<T extends ReadWriteValue | DeleteValue> extends ReadWriteResource {

    property: string;
    value: T;

}
