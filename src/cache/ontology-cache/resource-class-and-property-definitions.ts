import { IClassAndPropertyDefinitions } from "../../models/v2/ontologies/IClassAndPropertyDefinitions";
import { PropertyDefinition } from "../../models/v2/ontologies/property-definition";
import { TypeGuard } from "../../models/v2/resources/type-guard";
import { ResourceClassDefinitionWithPropertyDefinition } from "./resource-class-definition-with-property-definition";
import { OntologyConversionUtil } from "../../models/v2/ontologies/OntologyConversionUtil";

/**
 * Represents resource class definitions
 * and property definitions the resource classes have cardinalities for.
 */
export class ResourceClassAndPropertyDefinitions implements IClassAndPropertyDefinitions {

    /**
     * Resource class definitions and their cardinalities.
     */
    classes: { [index: string]: ResourceClassDefinitionWithPropertyDefinition };

    /**
     * Property definitions referred to in cardinalities.
     */
    properties: { [index: string]: PropertyDefinition };

    constructor(resClassDefs: { [index: string]: ResourceClassDefinitionWithPropertyDefinition }, propDefs: { [index: string]: PropertyDefinition }) {

        this.classes = resClassDefs;
        this.properties = propDefs;
    }

    /**
     * Gets all property definitions from the resource's entity info.
     */
    getAllPropertyDefinitions(): PropertyDefinition[] {
        return OntologyConversionUtil.getAllEntityDefinitionsAsArray(this.properties);
    }

    /**
     * Gets property definitions restricted by type from the resource's entity info.
     *
     * @param type restriction to a certain property definition type.
     */
    getPropertyDefinitionsByType<T extends PropertyDefinition>(type: TypeGuard.Constructor<T>): T[] {
        return OntologyConversionUtil.getEntityDefinitionsByTypeAsArray(this.getAllPropertyDefinitions(), type);
    }
}
