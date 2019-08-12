import {ValuePropertyClass} from "./value-property-class";
import {IHasProperty, ResourceClass} from "./resource-class";

export class OntologyV2 {
    lastModificationDate: string;
    properties: {[index: string]: ValuePropertyClass} = {};
    resourceClasses: {[index: string]: ResourceClass} = {};

    constructor(readonly id: string) { }
}
