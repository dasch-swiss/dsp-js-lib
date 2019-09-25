import { EntityDefinition } from "./EntityDefinition";

export abstract class PropertyDefinition extends EntityDefinition {

    abstract subPropertyOf: string[];

    abstract subjectType?: string;

    abstract objectType?: string;
}
