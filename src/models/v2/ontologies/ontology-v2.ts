import {PropertyClass} from './property-class';
import {ClassDefinition, IHasProperty, ResourceClass, StandoffClass} from './class-definition';

export class OntologyV2 {
    lastModificationDate: string;
    properties: {[index: string]: PropertyClass} = {};
    classes: {[index: string]: ClassDefinition} = {};

    dependsOnOntologies: Set<string>;

    constructor(readonly id: string) { }
}
