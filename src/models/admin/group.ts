import { JsonObject, JsonProperty } from "json2typescript";

import { IGroup } from "../../interfaces/models/admin/i-group";
import { Project } from "./project";

@JsonObject("Group")
export class Group implements IGroup {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("name", String)
    name: string = "";

    @JsonProperty("description", String)
    description: string = "";

    @JsonProperty("project", Project)
    project: Project | null = null;

    @JsonProperty("status", Boolean)
    status: boolean = false;

    @JsonProperty("selfjoin", Boolean)
    selfJoin: boolean = false;

}
