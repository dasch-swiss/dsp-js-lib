import { ApiResponseData, ApiResponseError, Project, UserResponse } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { KeywordsResponse } from "../../../models/admin/keywords-response";
import { ProjectResponse } from "../../../models/admin/project-response";
import { ProjectsResponse } from "../../../models/admin/projects-response";
import { StoredProject } from "../../../models/admin/stored-project";
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
                (response: ApiResponseData<ProjectResponse>) => {

                    expect(response.body.project.id).toEqual("http://rdfh.ch/projects/00FF");

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

    describe("Method getKeywords", () => {

        it("should return the keywords", done => {

            knoraApiConnection.admin.projectsEndpoint.getKeywords().subscribe(
                (response: ApiResponseData<KeywordsResponse>) => {

                    expect(response.body.keywords.length).toEqual(16);
                    expect(response.body.keywords[0]).toEqual("Basel");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const projects = require("../../../../test/data/api/admin/projects/get-keywords-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(projects)));

            expect(request.url).toBe("http://localhost:3333/admin/projects/Keywords");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getProjectKeywords", () => {

        it("should return a project's keywords", done => {

            knoraApiConnection.admin.projectsEndpoint.getProjectKeywords("http://rdfh.ch/projects/00FF").subscribe(
                (response: ApiResponseData<KeywordsResponse>) => {

                    expect(response.body.keywords.length).toEqual(14);
                    expect(response.body.keywords[0]).toEqual("Basel");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const projects = require("../../../../test/data/api/admin/projects/get-project-keywords-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(projects)));

            expect(request.url).toBe("http://localhost:3333/admin/projects/iri/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF/Keywords");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method updateProject", () => {

        xit("should update a project", done => {

            // TODO: fix in Knora: "id" and "shortcode" are not present on

            const project = new StoredProject();

            project.id = "http://rdfh.ch/projects/00FF";
            project.shortname = "newproject";
            project.longname = "updated project longname";

            const description = new StringLiteral();
            description.language = "en";
            description.value = "updated project description";

            project.description = [description];

            project.keywords = ["updated", "keywords"];
            project.logo = "/fu/bar/baz-updated.jpg";
            project.status = true;
            project.selfjoin = true;

            knoraApiConnection.admin.projectsEndpoint.updateProject(project).subscribe(
                (response: ApiResponseData<ProjectResponse>) => {

                    expect(response.body.project.id).toEqual("http://rdfh.ch/projects/00FF");

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const user = require("../../../../test/data/api/admin/projects/get-project-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(user)));

            expect(request.url).toBe("http://localhost:3333/admin/projects/iri/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const payload = require("../../../../test/data/api/admin/projects/update-project-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method deleteProject", () => {

        it("should delete a project", done => {

            knoraApiConnection.admin.projectsEndpoint.deleteProject("http://rdfh.ch/projects/00FF").subscribe(
                (response: ApiResponseData<ProjectResponse>) => {

                    expect(response.body.project.id).toEqual("http://rdfh.ch/projects/00FF");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const project = require("../../../../test/data/api/admin/projects/get-project-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(project)));

            expect(request.url).toBe("http://localhost:3333/admin/projects/iri/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF");

            expect(request.method).toEqual("DELETE");

        });

    });

});
