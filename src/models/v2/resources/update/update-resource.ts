import { JsonObject } from "json2typescript";
import { ReadWriteResource } from "../read-write-resource";
import { ReadWriteValue } from "../values/read-write-value";

@JsonObject("UpdateResource")
export class UpdateResource<T extends ReadWriteValue> extends ReadWriteResource {

    property: string;
    value: T;

}
