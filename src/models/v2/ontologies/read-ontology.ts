import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateTimeStamp } from "../custom-converters/date-time-stamp-converter";
import { ClassDefinition } from "./class-definition";
import { PropertyDefinition } from "./property-definition";

@JsonObject("ReadOntology")
export class ReadOntology {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStamp, true)
    lastModificationDate?: string = undefined;

    properties: { [index: string]: PropertyDefinition } = {};
    classes: { [index: string]: ClassDefinition } = {};

    dependsOnOntologies: Set<string>;

}
