import { PropertyDefinition } from "../../models/v2/ontologies/property-definition";
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
}
