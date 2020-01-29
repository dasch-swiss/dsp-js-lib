import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateTimeStampConverter } from "../custom-converters/date-time-stamp-converter";
import { ClassDefinition } from "./class-definition";
import { PropertyDefinition } from "./property-definition";

@JsonObject("ReadOntology")
export class ReadOntology {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDate?: string = undefined;

    properties: { [index: string]: PropertyDefinition } = {};
    classes: { [index: string]: ClassDefinition } = {};

    dependsOnOntologies: Set<string>;

}
