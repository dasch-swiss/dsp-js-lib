import { TypeGuard } from "../resources/type-guard";
import { ClassDefinition } from "./class-definition";
import { PropertyDefinition } from "./property-definition";

export interface IClassAndPropertyDefinitions {

    properties: { [index: string]: PropertyDefinition };
    classes: { [index: string]: ClassDefinition };

    getAllPropertyDefinitions(): PropertyDefinition[];
    getPropertyDefinitionsByType<T extends PropertyDefinition>(type: TypeGuard.Constructor<T>): T[];
}
