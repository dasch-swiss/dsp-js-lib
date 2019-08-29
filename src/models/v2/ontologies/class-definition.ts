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
}

export abstract class ClassDefinition {

    abstract id: string;

    abstract comment?: string;

    abstract label?: string;

    abstract subClassOf: string[];

    abstract propertiesList: IHasProperty[];
}
