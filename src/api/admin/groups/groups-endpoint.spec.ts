import { ApiResponseData, Group, UsersResponse } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { CreateGroupRequest } from "../../../models/admin/create-group-request";
import { GroupResponse } from "../../../models/admin/group-response";
import { GroupsResponse } from "../../../models/admin/groups-response";
import { MembersResponse } from "../../../models/admin/members-response";
import { StoredGroup } from "../../../models/admin/stored-group";

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

        xit("should create a group", done => {

            const group = new CreateGroupRequest();

            group.name =  "NewGroup";
            group.projectIri = "http://rdfh.ch/projects/00FF";
            group.status = true;
            group.selfjoin = false;

            // TODO: fix in Knora: payload

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

    describe("Method getGroupByIri", () => {

        it("should get a group by its IRI", done => {

            const groupIri = "http://rdfh.ch/groups/00FF/images-reviewer";

            knoraApiConnection.admin.groupsEndpoint.getGroupByIri(groupIri).subscribe(
                (response: ApiResponseData<GroupResponse>) => {

                    expect(response.body.group.id).toEqual("http://rdfh.ch/groups/00FF/images-reviewer");

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const group = require("../../../../test/data/api/admin/groups/get-group-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(group)));

            expect(request.url).toBe("http://localhost:3333/admin/groups/http%3A%2F%2Frdfh.ch%2Fgroups%2F00FF%2Fimages-reviewer");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method updateGroup", () => {

        xit("should update a group", done => {

            const storedGroup = new StoredGroup();

            storedGroup.id = "http://rdfh.ch/groups/00FF/images-reviewer";
            storedGroup.name =  "UpdatedGroupName";
            storedGroup.description = "UpdatedGroupDescription";

            // TODO: fix in Knora: payload

            knoraApiConnection.admin.groupsEndpoint.updateGroup(storedGroup).subscribe(
                (response: ApiResponseData<GroupResponse>) => {

                    // expect(response.body.groups.length).toEqual(2);
                    expect(response.body.group.name).toEqual("Image reviewer");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const group = require("../../../../test/data/api/admin/groups/get-group-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(group)));

            expect(request.url).toBe("http://localhost:3333/admin/groups/http%3A%2F%2Frdfh.ch%2Fgroups%2F00FF%2Fimages-reviewer");

            expect(request.method).toEqual("PUT");

            const payload = require("../../../../test/data/api/admin/groups/update-group-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method updateGroupStatus", () => {

        xit("should update a group's status", done => {

            const storedGroup = new StoredGroup();

            storedGroup.id = "http://rdfh.ch/groups/00FF/images-reviewer";
            storedGroup.status = true;

            // TODO: fix in Knora: payload

            knoraApiConnection.admin.groupsEndpoint.updateGroupStatus(storedGroup).subscribe(
                (response: ApiResponseData<GroupResponse>) => {

                    // expect(response.body.groups.length).toEqual(2);
                    expect(response.body.group.name).toEqual("Image reviewer");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const group = require("../../../../test/data/api/admin/groups/get-group-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(group)));

            expect(request.url).toBe("http://localhost:3333/admin/groups/http%3A%2F%2Frdfh.ch%2Fgroups%2F00FF%2Fimages-reviewer/status");

            expect(request.method).toEqual("PUT");

            const payload = require("../../../../test/data/api/admin/groups/change-group-status-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method deleteGroup", () => {

        it("should delete a group", done => {

            const groupIri = "http://rdfh.ch/groups/00FF/images-reviewer";

            knoraApiConnection.admin.groupsEndpoint.deleteGroup(groupIri).subscribe(
                (response: ApiResponseData<GroupResponse>) => {

                    // expect(response.body.groups.length).toEqual(2);
                    expect(response.body.group.name).toEqual("Image reviewer");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const group = require("../../../../test/data/api/admin/groups/get-group-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(group)));

            expect(request.url).toBe("http://localhost:3333/admin/groups/http%3A%2F%2Frdfh.ch%2Fgroups%2F00FF%2Fimages-reviewer");

            expect(request.method).toEqual("DELETE");

        });

    });

    describe("Method getGroupMembers", () => {

        it("should get a group's members", done => {

            const groupIri = "http://rdfh.ch/groups/00FF/images-reviewer";

            knoraApiConnection.admin.groupsEndpoint.getGroupMembers(groupIri).subscribe(
                (response: ApiResponseData<MembersResponse>) => {

                    expect(response.body.members.length).toEqual(2);
                    expect(response.body.members[0].id).toEqual("http://rdfh.ch/users/images-reviewer-user");

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const members = require("../../../../test/data/api/admin/groups/get-group-members-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(members)));

            expect(request.url).toBe("http://localhost:3333/admin/groups/http%3A%2F%2Frdfh.ch%2Fgroups%2F00FF%2Fimages-reviewer/members");

            expect(request.method).toEqual("GET");

        });

    });

});
