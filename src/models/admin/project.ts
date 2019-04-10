import { JsonObject, JsonProperty } from "json2typescript";

import { IProject } from "../../interfaces/models/admin/i-project";

@JsonObject("Project")
export class Project implements IProject {

    @JsonProperty("id", String)
    id: string = "";

    @JsonProperty("shortname", String)
    shortName: string = "";

    @JsonProperty("shortcode", String)
    shortCode: string = "";

    @JsonProperty("longname", String)
    longName: string = "";

    @JsonProperty("description", [String])
    description: string[] = [];

    @JsonProperty("keywords", [String])
    keywords: string[] = [];

    @JsonProperty("logo", String)
    logo: string = "";

    @JsonProperty("institution", String)
    institution: string = "";

    @JsonProperty("ontologies", [String])
    ontologies: string[] = [];

    @JsonProperty("status", Boolean)
    status: boolean = false;

    @JsonProperty("selfjoin", Boolean)
    selfJoin: boolean = false;

}
