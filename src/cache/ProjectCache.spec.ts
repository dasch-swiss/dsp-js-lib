import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { ProjectResponse } from "..";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ApiResponseData } from "../models/api-response-data";
import { ApiResponseError } from "../models/api-response-error";
import { ProjectCache } from "./ProjectCache";

describe("ProjectCache", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    let getProjectSpy: jasmine.Spy;
    let projectCache: ProjectCache;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    const project = require("../../test/data/api/admin/projects/get-project-response.json");

    const projectResp = jsonConvert.deserializeObject(project, ProjectResponse);

    beforeEach(() => {

        jasmine.Ajax.install();

        getProjectSpy = spyOn(knoraApiConnection.admin.projectsEndpoint, "getProject").and.callFake(
            (prop: "iri" | "shortname" | "shortcode", projectShortcode: string) => {

                return of({body: projectResp} as ApiResponseData<ProjectResponse> | ApiResponseError);
            }
        );

        projectCache = new ProjectCache(knoraApiConnection);

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem", () => {

        it("should get a project from the cache", done => {

            projectCache["getItem"]("00FF").subscribe((res: ProjectResponse) => {

                expect(res.project.shortcode).toEqual("00FF");
                expect(getProjectSpy).toHaveBeenCalledTimes(1);
                expect(getProjectSpy).toHaveBeenCalledWith("shortcode", "00FF");

                expect(projectCache["cache"]["00FF"]).not.toBeUndefined();
                done();

            });
        });

    });

});
