import { ApiResponseData, StringLiteral } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { CreateChildNodeRequest } from "../../../models/admin/create-child-node-request";
import { CreateListRequest } from "../../../models/admin/create-list-request";
import { ListInfoResponse } from "../../../models/admin/list-info-response";
import { ListNodeInfoResponse } from "../../../models/admin/list-node-info-response";
import { ListResponse } from "../../../models/admin/list-response";
import { ListsResponse } from "../../../models/admin/lists-response";
import { UpdateListInfoRequest } from "../../../models/admin/update-list-info-request";

describe("ListsEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getLists", () => {

        it("should return a list of lists", done => {

            knoraApiConnection.admin.listsEndpoint.getLists().subscribe(
                (res: ApiResponseData<ListsResponse>) => {
                    expect(res.body.lists.length).toEqual(8);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-lists-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getListsInProject", () => {

        it("should return a list of lists in a project", done => {

            knoraApiConnection.admin.listsEndpoint.getListsInProject("http://rdfh.ch/projects/0001").subscribe(
                (res: ApiResponseData<ListsResponse>) => {
                    expect(res.body.lists.length).toEqual(8);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-lists-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists?projectIri=http%3A%2F%2Frdfh.ch%2Fprojects%2F0001");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method createList", () => {

        it("should create a list", done => {

            const list = new CreateListRequest();

            list.comments = [];
            list.projectIri = "http://rdfh.ch/projects/0001";

            const label = new StringLiteral();
            label.language = "de";
            label.value = "Neue Liste";

            list.labels = [label];

            knoraApiConnection.admin.listsEndpoint.createList(list).subscribe(
                (res: ApiResponseData<ListResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const payload = require("../../../../test/data/api/admin/lists/create-list-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method getList", () => {

        it("should return a list", done => {

            knoraApiConnection.admin.listsEndpoint.getList("http://rdfh.ch/lists/0001/treeList").subscribe(
                (res: ApiResponseData<ListResponse>) => {
                    expect(res.body.list.listinfo.id).toEqual("http://rdfh.ch/lists/0001/treeList");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method UpdateListInfo", () => {

        it("should update a list", done => {

            const listInfo = new UpdateListInfoRequest();

            listInfo.listIri = "http://rdfh.ch/lists/0001/treeList01";
            listInfo.projectIri = "http://rdfh.ch/projects/0001";

            const label1 = new StringLiteral();
            label1.language = "de";
            label1.value = "Neue geänderte Liste";

            const label2 = new StringLiteral();
            label2.language = "en";
            label2.value = "Changed list";

            listInfo.labels = [label1, label2];

            const comment1 = new StringLiteral();
            comment1.language = "de";
            comment1.value = "Neuer Kommentar";

            const comment2 = new StringLiteral();
            comment2.language = "en";
            comment2.value = "New comment";

            listInfo.comments = [comment1, comment2];

            knoraApiConnection.admin.listsEndpoint.updateListInfo(listInfo).subscribe(
                (res: ApiResponseData<ListInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const payload = require("../../../../test/data/api/admin/lists/update-list-info-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method CreateChildNode", () => {

        it("should create a child node", done => {

            const childNode = new CreateChildNodeRequest();

            childNode.parentNodeIri = "http://rdfh.ch/lists/0001/treeList01";
            childNode.projectIri = "http://rdfh.ch/projects/0001";
            childNode.name = "abc123";

            const label1 = new StringLiteral();
            label1.language = "en";
            label1.value = "test node";


            childNode.labels = [label1];

            const comment1 = new StringLiteral();
            comment1.language = "en";
            comment1.value = "a node for testing";

            childNode.comments = [comment1];

            knoraApiConnection.admin.listsEndpoint.createChildNode(childNode).subscribe(
                (res: ApiResponseData<ListInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const payload = require("../../../../test/data/api/admin/lists/create-child-node-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method getListInfo", () => {

        it("should return information about a list", done => {

            knoraApiConnection.admin.listsEndpoint.getListInfo("http://rdfh.ch/lists/0001/treeList").subscribe(
                (res: ApiResponseData<ListInfoResponse>) => {

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/infos/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getListNodeInfo", () => {

        it("should return information about a list node", done => {

            knoraApiConnection.admin.listsEndpoint.getListNodeInfo("http://rdfh.ch/lists/0001/treeList01").subscribe(
                (res: ApiResponseData<ListNodeInfoResponse>) => {

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-node-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/nodes/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01");

            expect(request.method).toEqual("GET");

        });

    });

});
