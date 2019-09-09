import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter, SubPropertyOfConverter } from "../CustomConverters";
import { PropertyDefinition } from "./property-definition";

@JsonObject("SystemPropertyDefinition")
export class SystemPropertyDefinition extends PropertyDefinition {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.SubjectType, IdConverter, true)
    subjectType?: string = undefined;

    @JsonProperty(Constants.ObjectType, IdConverter, true)
    objectType?: string = undefined;
}
