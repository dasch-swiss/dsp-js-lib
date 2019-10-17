import { ApiResponseData, Group, UsersResponse } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { CreateGroupRequest } from "../../../models/admin/create-group-request";
import { GroupResponse } from "../../../models/admin/group-response";
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

    describe("Method createGroup", () => {

        xit("should create a  group", done => {

            const group = new CreateGroupRequest();

            group.name =  "NewGroup";
            group.projectIri = "http://rdfh.ch/projects/00FF";
            group.status = true;
            group.selfjoin = false;

            // TODO: fix in Knora: playload

            knoraApiConnection.admin.groupsEndpoint.createGroup(group).subscribe(
                (response: ApiResponseData<GroupResponse>) => {

                    // expect(response.body.groups.length).toEqual(2);
                    expect(response.body.group.name).toEqual("Image reviewer");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const groups = require("../../../../test/data/api/admin/groups/get-group-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(groups)));

            expect(request.url).toBe("http://localhost:3333/admin/groups");

            expect(request.method).toEqual("POST");

            const payload = require("../../../../test/data/api/admin/groups/create-group-request.json");

            expect(request.data()).toEqual(payload);

        });

    });


});
