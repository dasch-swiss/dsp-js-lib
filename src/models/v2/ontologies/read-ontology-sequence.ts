import { ReadOntology } from "./read-ontology";

export class ReadOntologySequence {

    /**
     * Represents a sequence of ontologies.
     *
     * @param ontologies sequence of ontologies.
     */
    constructor(readonly ontologies: ReadOntology[]) {
    }

}
