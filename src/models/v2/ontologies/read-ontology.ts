import {PropertyDefinition} from './property-definition';
import {ClassDefinition} from './class-definition';

export class ReadOntology {
    properties: {[index: string]: PropertyDefinition} = {};
    classes: {[index: string]: ClassDefinition} = {};

    dependsOnOntologies: Set<string>;

    constructor(readonly id: string, readonly lastModificationDate?: string) { }
}
