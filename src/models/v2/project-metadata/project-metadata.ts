import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("ProjectMetadataResponse")
export class ProjectMetadataResponse {

    @JsonProperty("http://ns.dasch.swiss/repository#hasName", String)
    name: string = "";

    @JsonProperty("http://ns.dasch.swiss/repository#hasFunder", String)
    founder: string = "";

    @JsonProperty("http://ns.dasch.swiss/repository#hasKeywords", [String])
    keywords: string[] = [];

    @JsonProperty("http://ns.dasch.swiss/repository#hasEndDate", String)
    endDate: string;

    @JsonProperty("http://ns.dasch.swiss/repository#hasCategories", String)
    categories: string;

    @JsonProperty("@type", String)
    type: string = "";

    @JsonProperty("http://ns.dasch.swiss/repository#hasStartDate", String)
    startDate: string;

    @JsonProperty("@id", String)
    id: string = "";
}
