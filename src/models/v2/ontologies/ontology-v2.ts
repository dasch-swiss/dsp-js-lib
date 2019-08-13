import {PropertyClass} from './property-class';
import {ClassDefinition, IHasProperty, ResourceClass, StandoffClass} from './resource-class';

export class OntologyV2 {
    lastModificationDate: string;
    properties: {[index: string]: PropertyClass} = {};
    classes: {[index: string]: ClassDefinition} = {};

    constructor(readonly id: string) { }
}
