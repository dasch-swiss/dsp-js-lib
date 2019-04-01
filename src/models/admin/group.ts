import { JsonObject, JsonProperty } from "json2typescript";

import { IGroup } from "../../interfaces/models/admin/i-group";
import { Project } from "./project";

@JsonObject("Group")
export class Group implements IGroup {

    @JsonProperty('id', String)
    public id: string = "";

    @JsonProperty('name', String)
    public name: string = "";

    @JsonProperty('description', String)
    public description: string = "";

    @JsonProperty('project', Project)
    public project: Project | null = null;

    @JsonProperty('status', Boolean)
    public status: boolean = false;

    @JsonProperty('selfjoin', Boolean)
    public selfJoin: boolean = false;

}