import { EntityDefinition } from "./EntityDefinition";

export enum Cardinality {
    "_1" = 0,
    "_0_1" = 1,
    "_0_n" = 2,
    "_1_n" = 3
}

export interface IHasProperty {
    propertyIndex: string;
    cardinality: Cardinality;
    guiOrder?: number;
    isInherited: boolean;
}

export abstract class ClassDefinition extends EntityDefinition {

    abstract subClassOf: string[];

    abstract propertiesList: IHasProperty[];
}
