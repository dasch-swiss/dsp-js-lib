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
        const classIndexes = Object.keys(this.classes);

        return classIndexes.map((classIndex: string) => {
            return this.classes[classIndex];
        });
    }

    /**
     * Gets class definitions restricted by type from the ontology's entity info.
     *
     * @param type restriction to a certain class definition type.
     */
    getClassDefinitionsByType<T extends ClassDefinition>(type: TypeGuard.Constructor<T>): T[] {
        return this.getAllClassDefinitions().filter(
            (classDef: ClassDefinition) => {
                return TypeGuard.typeGuard(classDef, type);
            }) as T[];
    }

    /**
     * Gets all property definitions from the ontology's entity info.
     */
    getAllPropertyDefinitions(): PropertyDefinition[] {
        return OntologyConversionUtil.getAllPropertyDefinitionsAsArray(this.properties);
    }

    /**
     * Gets property definitions restricted by type from the ontology's entity info.
     *
     * @param type restriction to a certain property definition type.
     */
    getPropertyDefinitionsByType<T extends PropertyDefinition>(type: TypeGuard.Constructor<T>): T[] {
        return OntologyConversionUtil.getPropertyDefinitionsByTypeAsArray(this.getAllPropertyDefinitions(), type);
    }

}
