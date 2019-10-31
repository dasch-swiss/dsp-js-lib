import { JsonObject } from "json2typescript";
import { ReadResource } from "../../read/read-resource";
import { ReadValue } from "./read-value";

@JsonObject("ReadLinkValue")
export class ReadLinkValue extends ReadValue {

    linkedResource?: ReadResource;

    linkedResourceIri: string;

    incoming: boolean;
}
