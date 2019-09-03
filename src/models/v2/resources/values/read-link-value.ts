import {JsonObject, JsonProperty} from "json2typescript";
import {Constants} from "../../Constants";
import {DecimalConverter} from "../../CustomConverters";
import {ReadResource} from "../read-resource";
import {ReadValue} from "./read-value";

@JsonObject('ReadLinkValue')
export class ReadLinkValue extends ReadValue {

    linkedResource?: ReadResource;

    linkedResourceIri: string;

    incoming: boolean;
}
