import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ChildNodeInfoResponse } from "../../../models/admin/child-node-info-response";
import { CreateChildNodeRequest } from "../../../models/admin/create-child-node-request";
import { CreateListRequest } from "../../../models/admin/create-list-request";
import { ListInfoResponse } from "../../../models/admin/list-info-response";
import { ListNodeInfoResponse } from "../../../models/admin/list-node-info-response";
import { ListResponse } from "../../../models/admin/list-response";
import { ListsResponse } from "../../../models/admin/lists-response";
import { StringLiteral } from "../../../models/admin/string-literal";
import { UpdateChildNodeCommentsRequest } from "../../../models/admin/update-child-node-comments-request";
import { UpdateChildNodeLabelsRequest } from "../../../models/admin/update-child-node-labels-request";
import { UpdateChildNodeNameRequest } from "../../../models/admin/update-child-node-name-request";
import { UpdateChildNodeRequest } from "../../../models/admin/update-child-node-request";
import { UpdateListInfoRequest } from "../../../models/admin/update-list-info-request";
import { ApiResponseData } from "../../../models/api-response-data";

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

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

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

            listInfo.listIri = "http://rdfh.ch/lists/0001/CeiuqMk_R1-lIOKh-fyddA";
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

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FCeiuqMk_R1-lIOKh-fyddA");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-list-info-request.json");

            // TODO: remove this bad hack once test data is stable
            payload["listIri"] = "http://rdfh.ch/lists/0001/CeiuqMk_R1-lIOKh-fyddA";

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method UpdateChildNode", () => {

        it("should update the name, labels, and comments of an existing child node", done => {

            // test data for this test has been created manually!

            const childNode = new UpdateChildNodeRequest();

            childNode.listIri = "http://rdfh.ch/lists/0001/treeList01";

            childNode.projectIri = "http://rdfh.ch/projects/0001";

            childNode.name = "updated third child name";

            const newLabels = new StringLiteral();
            newLabels.language = "se";
            newLabels.value = "nya märkningen för nod";

            childNode.labels = [newLabels];

            const newComments = new StringLiteral();
            newComments.language = "se";
            newComments.value = "nya kommentarer för nod";

            childNode.comments = [newComments];

            knoraApiConnection.admin.listsEndpoint.updateChildNode(childNode).subscribe(
                (res: ApiResponseData<ChildNodeInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const childNodeResponse = require("../../../../test/data/api/admin/manually-generated/update-node-info-name-comment-label-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(childNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8", "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

            const payload = require("../../../../test/data/api/admin/manually-generated/update-node-info-name-comment-label-request.json");

            expect(request.data()).toEqual(payload);
        });

        it("should update the name of an existing child node", done => {

            const childNode = new UpdateChildNodeRequest();

            childNode.listIri = "http://rdfh.ch/lists/0001/a-child-node-with-IRI";

            childNode.projectIri = "http://rdfh.ch/projects/0001";

            childNode.name = "modified third child";

            knoraApiConnection.admin.listsEndpoint.updateChildNode(childNode).subscribe(
                (res: ApiResponseData<ChildNodeInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const childNodeResponse = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/update-node-info-name-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(childNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2Fa-child-node-with-IRI");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8", "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

            const payload = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/update-node-info-name-request.json");

            expect(request.data()).toEqual(payload);
        });

    });

    describe("Method UpdateChildName", () => {

        it("should update the name of an existing child node", done => {

            const childNodeName = new UpdateChildNodeNameRequest();

            const listItemIri = "http://rdfh.ch/lists/0001/treeList01";

            const newName = "updated third child name";

            childNodeName.name = newName;

            knoraApiConnection.admin.listsEndpoint.updateChildName(listItemIri, childNodeName).subscribe(
                (res: ApiResponseData<ChildNodeInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const childNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-name-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(childNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01/name");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-name-request.json");

            expect(request.data()).toEqual(payload);
        });

    });

    describe("Method UpdateChildLabels", () => {

        it("should update the labels of an existing child node", done => {

            const childNodeLabels = new UpdateChildNodeLabelsRequest();

            const listItemIri = "http://rdfh.ch/lists/0001/treeList01";

            const newLabels = new StringLiteral();
            newLabels.language = "se";
            newLabels.value = "nya märkningen för nod";

            childNodeLabels.labels = [newLabels];

            knoraApiConnection.admin.listsEndpoint.updateChildLabels(listItemIri, childNodeLabels).subscribe(
                (res: ApiResponseData<ChildNodeInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const childNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-labels-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(childNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01/labels");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-labels-request.json");

            expect(request.data()).toEqual(payload);
        });

    });

    describe("Method UpdateChildComments", () => {

        it("should update the comments of an existing child node", done => {

            const childNodeComments = new UpdateChildNodeCommentsRequest();

            const listItemIri = "http://rdfh.ch/lists/0001/treeList01";

            const newComments = new StringLiteral();
            newComments.language = "se";
            newComments.value = "nya kommentarer för nod";

            childNodeComments.comments = [newComments];

            knoraApiConnection.admin.listsEndpoint.updateChildComments(listItemIri, childNodeComments).subscribe(
                (res: ApiResponseData<ChildNodeInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const childNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-comments-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(childNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01/comments");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-comments-request.json");

            expect(request.data()).toEqual(payload);
        });

    });

    describe("Method CreateChildNode", () => {

        it("should create a child node", done => {

            const childNode = new CreateChildNodeRequest();

            childNode.parentNodeIri = "http://rdfh.ch/lists/0001/CeiuqMk_R1-lIOKh-fyddA";
            childNode.projectIri = "http://rdfh.ch/projects/0001";
            childNode.name = "first";

            const label1 = new StringLiteral();
            label1.language = "en";
            label1.value = "New First Child List Node Value";

            childNode.labels = [label1];

            const comment1 = new StringLiteral();
            comment1.language = "en";
            comment1.value = "New First Child List Node Comment";

            childNode.comments = [comment1];

            knoraApiConnection.admin.listsEndpoint.createChildNode(childNode).subscribe(
                (res: ApiResponseData<ListNodeInfoResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/get-list-node-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FCeiuqMk_R1-lIOKh-fyddA");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/create-child-node-request.json");

            // TODO: remove this bad hack once test data is stable
            payload["parentNodeIri"] = "http://rdfh.ch/lists/0001/CeiuqMk_R1-lIOKh-fyddA";

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

    describe("Method getListNodeInfoV2", () => {

        it("should return information about a list node", done => {

            knoraApiConnection.admin.listsEndpoint.getListNodeInfoV2("http://rdfh.ch/lists/0001/treeList01").subscribe(
                (res: ApiResponseData<ListNodeInfoResponse>) => {

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/get-list-node-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01/info");

            expect(request.method).toEqual("GET");

            expect(request.requestHeaders).toEqual({ "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

        });

    });

    describe("Method createListV2", () => {

        it("should create a list", done => {

            const list = new CreateListRequest();

            list.comments = [];
            list.projectIri = "http://rdfh.ch/projects/0001";

            const label = new StringLiteral();
            label.language = "de";
            label.value = "Neue Liste";

            list.labels = [label];

            knoraApiConnection.admin.listsEndpoint.createListV2(list).subscribe(
                (res: ApiResponseData<ListResponse>) => {
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/create-list-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8", "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

            const payload = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/create-list-request.json");

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method getListV2", () => {

        it("should return a list", done => {

            knoraApiConnection.admin.listsEndpoint.getListV2("http://rdfh.ch/lists/0001/treeList").subscribe(
                (res: ApiResponseData<ListResponse>) => {
                    expect(res.body.list.listinfo.id).toEqual("http://rdfh.ch/lists/0001/treeList");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/get-list-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList");

            expect(request.method).toEqual("GET");

            expect(request.requestHeaders).toEqual({ "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

        });

    });

});
