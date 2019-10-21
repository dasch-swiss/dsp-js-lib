import { ApiResponseData, ApiResponseError, Project, UserResponse } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ProjectResponse } from "../../../models/admin/project-response";
import { ProjectsResponse } from "../../../models/admin/projects-response";
import { StringLiteral } from "../../../models/admin/string-literal";

describe("ProjectsEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getProjects", () => {

        it("should return all projects", done => {

            knoraApiConnection.admin.projectsEndpoint.getProjects().subscribe(
                (response: ApiResponseData<ProjectsResponse>) => {

                    expect(response.body.projects.length).toEqual(8);
                    expect(response.body.projects[0].id).toEqual("http://rdfh.ch/projects/0001");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const projects = require("../../../../test/data/api/admin/projects/get-projects-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(projects)));

            expect(request.url).toBe("http://localhost:3333/admin/projects");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method createProject", () => {

        it("should create a project", done => {

            const project = new Project();
            project.shortname = "newproject";
            project.shortcode = "1111";
            project.longname = "project longname";

            const description = new StringLiteral();
            description.language = "en";
            description.value = "project description";

            project.description = [description];

            project.keywords = ["keywords"];
            project.logo = "/fu/bar/baz.jpg";
            project.status = true;
            project.selfjoin = false;

            knoraApiConnection.admin.projectsEndpoint.createProject(project).subscribe(
                (response: ApiResponseData<ProjectResponse> | ApiResponseError) => {

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const user = require("../../../../test/data/api/admin/projects/get-project-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(user)));

            expect(request.url).toBe("http://localhost:3333/admin/projects");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const payload = require("../../../../test/data/api/admin/projects/create-project-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

});
