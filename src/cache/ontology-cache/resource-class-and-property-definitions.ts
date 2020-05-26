import { PropertyDefinition } from "../../models/v2/ontologies/property-definition";
import { TypeGuard } from "../../models/v2/resources/type-guard";
import { ResourceClassDefinitionWithPropertyDefinition } from "./resource-class-definition-with-property-definition";

/**
 * Represents resource class definitions
 * and property definitions the resource classes have cardinalities for.
 */
export class ResourceClassAndPropertyDefinitions {

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
        const propIndexes = Object.keys(this.properties);

        return propIndexes.map((propIndex: string) => {
            return this.properties[propIndex];
        });
    }

    /**
     * Gets property definitions restricted by type from the resource's entity info.
     *
     * @param type restriction to a certain property definition type.
     */
    getPropertyDefinitionsByType<T extends PropertyDefinition>(type: TypeGuard.Constructor<T>): T[] {

        return this.getAllPropertyDefinitions().filter(
            (prop: PropertyDefinition) => {
                return TypeGuard.typeGuard(prop, type);
            }) as T[];
    }
}
