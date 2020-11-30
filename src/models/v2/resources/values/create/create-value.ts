import { JsonObject } from "json2typescript";
import { WriteValue } from "../write-value";

/**
 * @category Model
 */
@JsonObject("CreateValue")
export abstract class CreateValue extends WriteValue {

    constructor(type: string) {
        super();
        this.type = type;
    }

}
