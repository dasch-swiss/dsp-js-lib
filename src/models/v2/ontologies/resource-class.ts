import {PropertyClass} from "./property-class";

export enum Cardinality {
    "_1" = 0,
    "0-1" = 1,
    "0-n" = 2,
    "1-n" = 3
}

export interface HasProperty {
    propertyIndex: string;
    cardinality: Cardinality;
    guiOrder: number;
}

export class ResourceClass {
    id: string;
    subClassOf: ResourceClass[];
    comment: string;
    label: string;
    propertiesList: HasProperty[];
}
