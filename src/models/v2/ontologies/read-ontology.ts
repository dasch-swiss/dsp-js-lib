import {PropertyDefinition} from './property-definition';
import {ClassDefinition} from './class-definition';

export class ReadOntology {
    lastModificationDate: string;
    properties: {[index: string]: PropertyDefinition} = {};
    classes: {[index: string]: ClassDefinition} = {};

    dependsOnOntologies: Set<string>;

    constructor(readonly id: string) { }
}
