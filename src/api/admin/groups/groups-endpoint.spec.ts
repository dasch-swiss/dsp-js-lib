import { ApiResponseData, UsersResponse } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { GroupsResponse } from "../../../models/admin/groups-response";

describe("GroupsEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getGroups", () => {

        it("should return all groups", done => {

            knoraApiConnection.admin.groupsEndpoint.getGroups().subscribe(
                (response: ApiResponseData<GroupsResponse>) => {

                    expect(response.body.groups.length).toEqual(2);
                    expect(response.body.groups[0].id).toEqual("http://rdfh.ch/groups/0001/thing-searcher");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const groups = require("../../../../test/data/api/admin/groups/get-groups-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(groups)));

            expect(request.url).toBe("http://localhost:3333/admin/groups");

            expect(request.method).toEqual("GET");

        });

    });

});
