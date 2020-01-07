import { GroupPattern } from "../values/search/group-pattern";

export class SearchResource {

    constructor(public type?: string, public properties: GroupPattern[] = []) {}

}
