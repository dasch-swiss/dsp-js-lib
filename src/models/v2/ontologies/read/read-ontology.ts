import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { DateTimeStampConverter } from "../../custom-converters/date-time-stamp-converter";
import { TypeGuard } from "../../resources/type-guard";
import { ClassDefinition } from "../class-definition";
import { IClassAndPropertyDefinitions } from "../IClassAndPropertyDefinitions";
import { OntologyConversionUtil } from "../OntologyConversionUtil";
import { PropertyDefinition } from "../property-definition";

@JsonObject("ReadOntology")
export class ReadOntology implements IClassAndPropertyDefinitions {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.LastModificationDate, DateTimeStampConverter, true)
    lastModificationDate?: string = undefined;

    properties: { [index: string]: PropertyDefinition } = {};
    classes: { [index: string]: ClassDefinition } = {};

    dependsOnOntologies: Set<string>;

    /**
     * Gets all class definitions from the ontology's entity info.
     */
    getAllClassDefinitions(): ClassDefinition[] {
        return OntologyConversionUtil.getAllEntityDefinitionsAsArray(this.classes);
    }

    /**
     * Gets class definitions restricted by type from the ontology's entity info.
     *
     * @param type restriction to a certain class definition type.
     */
    getClassDefinitionsByType<T extends ClassDefinition>(type: TypeGuard.Constructor<T>): T[] {
        return OntologyConversionUtil.getEntityDefinitionsByTypeAsArray(this.getAllClassDefinitions(), type);
    }

    /**
     * Gets all property definitions from the ontology's entity info.
     */
    getAllPropertyDefinitions(): PropertyDefinition[] {
        return OntologyConversionUtil.getAllEntityDefinitionsAsArray(this.properties);
    }

    /**
     * Gets property definitions restricted by type from the ontology's entity info.
     *
     * @param type restriction to a certain property definition type.
     */
    getPropertyDefinitionsByType<T extends PropertyDefinition>(type: TypeGuard.Constructor<T>): T[] {
        return OntologyConversionUtil.getEntityDefinitionsByTypeAsArray(this.getAllPropertyDefinitions(), type);
    }

}
