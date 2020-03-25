import { ReadResource } from "./read-resource";

export class ReadResourceSequence {

    constructor(readonly resources: ReadResource[], readonly mayHaveMoreResults = false) {
    }

}
