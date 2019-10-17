import { ApiResponseData } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { GroupsResponse } from "../../../models/admin/groups-response";
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

        xit("should return all projects", done => {

            // TODO: fix in Knora

            /*

            Fatal error in JsonConvert. Failed to map the JSON object to the class "ReadProject" because the defined JSON property "members" does not exist:

	Class property:
		members

	JSON property:
		members

             */

            knoraApiConnection.admin.projectsEndpoint.getProjects().subscribe(
                (response: ApiResponseData<ProjectsResponse>) => {

                    expect(response.body.projects.length).toEqual(2);
                    expect(response.body.projects[0].id).toEqual("http://rdfh.ch/groups/0001/thing-searcher");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const groups = require("../../../../test/data/api/admin/projects/get-projects-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(groups)));

            expect(request.url).toBe("http://localhost:3333/admin/projects");

            expect(request.method).toEqual("GET");

        });

    });

});