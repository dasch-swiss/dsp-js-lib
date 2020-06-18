import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { ProjectsResponse } from "../../../../src/models/admin/projects-response";

import projects from "./projects/get-projects-response.json";

export namespace MockProjects {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const mockProjects = (): ProjectsResponse => {
        return jsonConvert.deserializeObject(projects, ProjectsResponse);
    };
}
