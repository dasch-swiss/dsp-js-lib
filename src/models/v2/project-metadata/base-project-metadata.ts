import { JsonObject } from "json2typescript";
import { BaseValue } from "../resources/values/base-value";

@JsonObject("BaseProjectMetadata")
export class BaseProjectMetadata extends BaseValue {

    constructor(type: string) {
        super();
        this.type = type;
    }
}
