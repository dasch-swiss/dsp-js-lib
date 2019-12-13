import { JsonObject, JsonProperty } from "json2typescript";
import { StringLiteral } from "./string-literal";

@JsonObject("ProjectLists")
export class ProjectLists {

    @JsonProperty("comments", [StringLiteral], true)
    comments?: StringLiteral[] = [];

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("labels", [StringLiteral])
    labels?: StringLiteral[] = [];

    @JsonProperty("name", String, true)
    name?: string = "";
}

@JsonObject("FullListNode")
export class FullListNode {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("children", [FullListNode])
    children: FullListNode[] = [];

    @JsonProperty("comments", [StringLiteral], true)
    comments?: StringLiteral[] = [];

    @JsonProperty("labels", [StringLiteral])
    labels?: StringLiteral[] = [];

    @JsonProperty("name", String, true)
    name?: string = undefined;

    @JsonProperty("position", Number)
    position: number = 0;

}

@JsonObject("ListInfo")
export class ListInfo {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("comments", [StringLiteral], true)
    comments?: StringLiteral[] = [];

    @JsonProperty("labels", [StringLiteral])
    labels?: StringLiteral[] = [];

    @JsonProperty("name", String, true)
    name?: string = undefined;

    @JsonProperty("projectIri", String)
    projectIri: string = "";

}

@JsonObject("FullList")
export class FullList {

    @JsonProperty("listinfo", ListInfo)
    listinfo: ListInfo = {id: "", projectIri: ""};

    @JsonProperty("children", [FullListNode])
    children: FullListNode[] = [];

}
