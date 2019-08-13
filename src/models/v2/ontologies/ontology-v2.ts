import {PropertyClass} from './property-class';
import {IHasProperty, ResourceClass, StandoffClass} from './resource-class';

export class OntologyV2 {
    lastModificationDate: string;
    properties: {[index: string]: PropertyClass} = {};
    resourceClasses: {[index: string]: ResourceClass} = {};
    standoffClasses: {[index: string]: StandoffClass} = {};

    constructor(readonly id: string) { }
}
