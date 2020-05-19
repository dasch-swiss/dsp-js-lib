import { IHasProperty } from "../../models/v2/ontologies/class-definition";
import { PropertyDefinition } from "../../models/v2/ontologies/property-definition";
import { ResourceClassDefinition } from "../../models/v2/ontologies/resource-class-definition";

/**
 * Represents a resource class definition containing all property definitions it has cardinalities for.
 */
export class ResourceClassDefinitionWithPropertyDefinition extends ResourceClassDefinition {

    propertiesList: IHasPropertyWithPropertyDefinition[];

    /**
     * Create an instance from a given `ResourceClassDefinition`.
     *
     * @param resClassDef instance of `ResourceClassDefinition`.
     * @param propertyDefinitions object containing all `PropertyDefinition`
     *                            the resource class definition has cardinalities for.
     */
    constructor(resClassDef: ResourceClassDefinition, propertyDefinitions: { [index: string]: PropertyDefinition }) {
        super();

        this.id = resClassDef.id;
        this.label = resClassDef.label;
        this.comment = resClassDef.comment;
        this.subClassOf = resClassDef.subClassOf;

        // add property definition to properties list's items
        this.propertiesList = resClassDef.propertiesList.map((prop: IHasProperty) => {

            if (propertyDefinitions[prop.propertyIndex] === undefined) {
                throw Error(`Expected key ${prop.propertyIndex} in property definitions.`);
            }

            const propInfo: IHasPropertyWithPropertyDefinition = {
                propertyIndex: prop.propertyIndex,
                cardinality: prop.cardinality,
                guiOrder: prop.guiOrder,
                isInherited: prop.isInherited,
                propertyDefinition: propertyDefinitions[prop.propertyIndex]
            };
            return propInfo;
        });
    }
}

/**
 * Represents a property defined on a resource class including the property definition.
 */
export interface IHasPropertyWithPropertyDefinition extends IHasProperty {

    propertyDefinition: PropertyDefinition;
}

/**
 * Represents resource class definitions
 * and property definitions the resource classes have cardinalities for.
 */
export interface IResourceClassAndPropertyDefinitions {

    /**
     * Resource class definitions and their cardinalities.
     */
    classes: { [index: string]: ResourceClassDefinitionWithPropertyDefinition };

    /**
     * Property definitions referred to in cardinalities.
     */
    properties: { [index: string]: PropertyDefinition };
}
