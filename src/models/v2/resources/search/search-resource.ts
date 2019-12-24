import { Expression } from "../values/search/expression";

export class SearchResource {

    constructor(public type?: string, public properties: Expression[] = []) {}

}
