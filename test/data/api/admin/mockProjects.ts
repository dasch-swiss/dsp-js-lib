import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { AjaxResponse } from "rxjs/ajax";
import { ApiResponseData } from "../../../../src/models/api-response-data";
import { ProjectsResponse } from "../../../../src/models/admin/projects-response";
import { ProjectResponse } from "../../../../src/models/admin/project-response";

import projects from "./projects/get-projects-response.json";
import project from "./projects/get-project-response.json";

export namespace MockProjects {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const mockProjects = (): ApiResponseData<ProjectsResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, {}));

        const projectsRes = jsonConvert.serializeObject(projects, ProjectsResponse);
        responseData.body = projectsRes;
        return responseData as ApiResponseData<ProjectsResponse>;
    };

    export const mockProject = (): ApiResponseData<ProjectResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, {}));

        const projectRes = jsonConvert.serializeObject(project, ProjectResponse);
        responseData.body = projectRes;
        return responseData as ApiResponseData<ProjectResponse>;
    };
}
