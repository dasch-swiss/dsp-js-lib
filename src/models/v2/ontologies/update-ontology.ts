import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { DateTimeStampConverter } from "../custom-converters/date-time-stamp-converter";

/**
 * UpdateOntology class can be used whenever the ontology, 
 * a resource class or a resource property has to be updated (incl. delete).
 * It can be used to update 
 *   - ontology: ontology id and lastModificationDate
 *   - resource classe: res class id and lastModificationDate
 *   - resource property: res prop id and lastModificationDate
 */
@JsonObject("UpdateOntology")
export class UpdateOntology {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDate: string;

}
