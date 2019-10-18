import { ApiResponseData } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ProjectsResponse } from "../../../models/admin/projects-response";

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

});
