import {PropertyClass} from "./property-class";
import {HasProperty, ResourceClass} from "./resource-class";

export class OntologyV2 {
    lastModificationDate: string;
    properties: {[index: string]: PropertyClass} = {};
    resourceClasses: {[index: string]: ResourceClass} = {};

    constructor(readonly id: string) { }
}
