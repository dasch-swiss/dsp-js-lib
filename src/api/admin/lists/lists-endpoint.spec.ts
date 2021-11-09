import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ChildNodeInfoResponse } from "../../../models/admin/child-node-info-response";
import { CreateChildNodeRequest } from "../../../models/admin/create-child-node-request";
import { CreateListRequest } from "../../../models/admin/create-list-request";
import { DeleteListNodeResponse } from "../../../models/admin/delete-list-node-response";
import { DeleteListResponse } from "../../../models/admin/delete-list-response";
import { ListChildNodeResponse } from "../../../models/admin/list-child-node-response";
import { ListInfoResponse } from "../../../models/admin/list-info-response";
import { ListNodeInfoResponse } from "../../../models/admin/list-node-info-response";
import { ListResponse } from "../../../models/admin/list-response";
import { ListsResponse } from "../../../models/admin/lists-response";
import { RepositionChildNodeRequest } from "../../../models/admin/reposition-child-node-request";
import { RepositionChildNodeResponse } from "../../../models/admin/reposition-child-node-response";
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
                    expect(res.body.listinfo.comments.length).toEqual(1);
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
                    expect(res.body.nodeinfo.name).toEqual("updated third child name");
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

            childNode.listIri = "http://rdfh.ch/lists/0001/JbKZ-L_i5rTwHlv4dSNp4A";

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

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FJbKZ-L_i5rTwHlv4dSNp4A");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8", "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

            const payload = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/update-node-info-name-request.json");

            expect(request.data()).toEqual(payload);
        });

        it("should throw an error if given an incomplete UpdateChildNodeRequest", () => {

            const childNode = new UpdateChildNodeRequest();

            childNode.listIri = "http://rdfh.ch/lists/0001/a-child-node-with-IRI";

            childNode.projectIri = "http://rdfh.ch/projects/0001";

            expect(() =>
                knoraApiConnection.admin.listsEndpoint.updateChildNode(childNode)
            ).toThrow(new Error("At least one property is expected from the following properties: name, labels, comments."));
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
                    expect(res.body.nodeinfo.name).toEqual("updated third child name");
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
                    expect(res.body.nodeinfo.labels[0].value).toEqual("nya märkningen för nod");
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
            newComments.language = "";
            newComments.value = "";

            childNodeComments.comments = [newComments];

            knoraApiConnection.admin.listsEndpoint.updateChildComments(listItemIri, childNodeComments).subscribe(
                (res: ApiResponseData<ChildNodeInfoResponse>) => {
                    expect(res.body.nodeinfo.comments[0].value).toEqual("nya kommentarer för nod");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const childNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-comments-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(childNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01/comments");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            // const payload = require("../../../../test/data/api/admin/lists/update-childNode-comments-request.json");

            // expect(request.data()).toEqual(payload);
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
                    expect(res.body.nodeinfo.id).toEqual('http://rdfh.ch/lists/0001/treeList01');
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

        it("should create a child node at a specific position", done => {

            const childNode = new CreateChildNodeRequest();

            childNode.parentNodeIri = "http://rdfh.ch/lists/0001/CeiuqMk_R1-lIOKh-fyddA";
            childNode.projectIri = "http://rdfh.ch/projects/0001";
            childNode.name = "child with position";

            const label1 = new StringLiteral();
            label1.language = "en";
            label1.value = "Inserted List Node Label";

            childNode.labels = [label1];

            const comment1 = new StringLiteral();
            comment1.language = "en";
            comment1.value = "Inserted List Node Comment";

            childNode.comments = [comment1];

            childNode.position = 1;

            knoraApiConnection.admin.listsEndpoint.createChildNode(childNode).subscribe(
                (res: ApiResponseData<ListNodeInfoResponse>) => {
                    expect(res.body.nodeinfo.name).toEqual("child with position");
                    expect(res.body.nodeinfo.position).toEqual(1);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/insert-childNode-in-position-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FCeiuqMk_R1-lIOKh-fyddA");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/insert-childNode-in-position-request.json");

            // TODO: remove this bad hack once test data is stable
            payload["parentNodeIri"] = "http://rdfh.ch/lists/0001/CeiuqMk_R1-lIOKh-fyddA";

            expect(request.data()).toEqual(payload);

        });

    });

    describe("Method getListNodeInfo", () => {

        it("should return information about a list child node", done => {

            knoraApiConnection.admin.listsEndpoint.getListNodeInfo("http://rdfh.ch/lists/0001/treeList01").subscribe(
                (res: ApiResponseData<ListNodeInfoResponse | ListInfoResponse>) => {
                    expect(res.body instanceof ListNodeInfoResponse).toBeTruthy();
                    expect((res.body as ListNodeInfoResponse).nodeinfo.labels[0].value).toEqual("Tree list node 01");
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

        it("should return information about a list root node", done => {

            knoraApiConnection.admin.listsEndpoint.getListNodeInfo("http://rdfh.ch/lists/0001/treeList").subscribe(
                (res: ApiResponseData<ListNodeInfoResponse | ListInfoResponse>) => {
                    expect(res.body instanceof ListInfoResponse).toBeTruthy();
                    expect((res.body as ListInfoResponse).listinfo.labels[1].value).toEqual("Tree list root");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/get-list-info-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList/info");

            expect(request.method).toEqual("GET");

            expect(request.requestHeaders).toEqual({ "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

        });
    });

    describe("Method createList", () => {

        it("should create a list", done => {

            const list = new CreateListRequest();

            list.comments = [new StringLiteral()];
            list.projectIri = "http://rdfh.ch/projects/0001";

            const label = new StringLiteral();
            label.language = "de";
            label.value = "Neue Liste";

            list.labels = [label];

            list.comments[0].value = "XXXXX";
            list.comments[0].language = "en";

            knoraApiConnection.admin.listsEndpoint.createList(list).subscribe(
                (res: ApiResponseData<ListResponse>) => {
                    expect(res.body.list.listinfo.labels[0].value).toEqual("Neue Liste");
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

    describe("Method getList", () => {

        it("should return a list (root node)", done => {

            knoraApiConnection.admin.listsEndpoint.getList("http://rdfh.ch/lists/0001/treeList").subscribe(
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

        it("should return a list child node", done => {

            knoraApiConnection.admin.listsEndpoint.getList("http://rdfh.ch/lists/0001/treeList03").subscribe(
                (res: ApiResponseData<ListChildNodeResponse>) => {
                    expect(res.body.node.nodeinfo.id).toEqual("http://rdfh.ch/lists/0001/treeList03");
                    expect(res.body.node.children.length).toEqual(2);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/toggle_new-list-admin-routes_v1/get-node-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList03");

            expect(request.method).toEqual("GET");

            expect(request.requestHeaders).toEqual({ "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" });

        });

    });

    describe("Method deleteListNode", () => {

        it("should delete a list child node", done => {

            knoraApiConnection.admin.listsEndpoint.deleteListNode("http://rdfh.ch/lists/0001/notUsedList016").subscribe(
                (res: ApiResponseData<DeleteListNodeResponse | DeleteListResponse>) => {
                    expect(res.body instanceof DeleteListNodeResponse).toBeTruthy();
                    expect((res.body as DeleteListNodeResponse).node.id).toEqual("http://rdfh.ch/lists/0001/notUsedList");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/delete-list-node-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FnotUsedList016");

            expect(request.method).toEqual("DELETE");

            expect(request.requestHeaders).toEqual({});

        });

        it("should delete a list root node", done => {

            knoraApiConnection.admin.listsEndpoint.deleteListNode("http://rdfh.ch/lists/0001/notUsedList").subscribe(
                (res: ApiResponseData<DeleteListResponse | DeleteListResponse>) => {
                    expect(res.body instanceof DeleteListResponse).toBeTruthy();
                    expect((res.body as DeleteListResponse).iri).toEqual("http://rdfh.ch/lists/0001/notUsedList");
                    expect((res.body as DeleteListResponse).deleted).toBeTruthy();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const listsResponse = require("../../../../test/data/api/admin/lists/delete-list-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(listsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FnotUsedList");

            expect(request.method).toEqual("DELETE");

            expect(request.requestHeaders).toEqual({});

        });

    });

    describe("Method repositionListNode", () => { 
        it("should reposition a list child node to the second position among its siblings", done => {

            const repositionChildNode = new RepositionChildNodeRequest();
            repositionChildNode.parentNodeIri = "http://rdfh.ch/lists/0001/notUsedList01";
            repositionChildNode.position = 1;

            knoraApiConnection.admin.listsEndpoint.repositionChildNode("http://rdfh.ch/lists/0001/notUsedList014", repositionChildNode).subscribe(
                (res: ApiResponseData<RepositionChildNodeResponse>) => {
                    expect(res.body.node.children[1].id).toEqual("http://rdfh.ch/lists/0001/notUsedList014");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const repositionListNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-position-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(repositionListNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FnotUsedList014/position");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-position-request.json");

            expect(request.data()).toEqual(payload);

        });

        it("should reposition a list child node to the last position among its siblings", done => {

            const repositionChildNode = new RepositionChildNodeRequest();
            repositionChildNode.parentNodeIri = "http://rdfh.ch/lists/0001/notUsedList01";
            repositionChildNode.position = -1;

            knoraApiConnection.admin.listsEndpoint.repositionChildNode("http://rdfh.ch/lists/0001/notUsedList012", repositionChildNode).subscribe(
                (res: ApiResponseData<RepositionChildNodeResponse>) => {
                    expect(res.body.node.children[res.body.node.children.length - 1].id).toEqual("http://rdfh.ch/lists/0001/notUsedList012");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const repositionListNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-position-to-end-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(repositionListNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FnotUsedList012/position");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-position-to-end-request.json");

            expect(request.data()).toEqual(payload);

        });

        it("should reposition a list child node to the third position with a new parent", done => {

            const repositionChildNode = new RepositionChildNodeRequest();
            repositionChildNode.parentNodeIri = "http://rdfh.ch/lists/0001/notUsedList";
            repositionChildNode.position = 2;

            knoraApiConnection.admin.listsEndpoint.repositionChildNode("http://rdfh.ch/lists/0001/notUsedList015", repositionChildNode).subscribe(
                (res: ApiResponseData<RepositionChildNodeResponse>) => {
                    expect(res.body.node.children[2].id).toEqual("http://rdfh.ch/lists/0001/notUsedList015");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const repositionListNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-position-new-parent-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(repositionListNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FnotUsedList015/position");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-position-new-parent-request.json");

            expect(request.data()).toEqual(payload);

        });

        it("should reposition a list child node to the last position with a new parent", done => {

            const repositionChildNode = new RepositionChildNodeRequest();
            repositionChildNode.parentNodeIri = "http://rdfh.ch/lists/0001/notUsedList";
            repositionChildNode.position = -1;

            knoraApiConnection.admin.listsEndpoint.repositionChildNode("http://rdfh.ch/lists/0001/notUsedList015", repositionChildNode).subscribe(
                (res: ApiResponseData<RepositionChildNodeResponse>) => {
                    expect(res.body.node.children[res.body.node.children.length - 1].id).toEqual("http://rdfh.ch/lists/0001/notUsedList015");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const repositionListNodeResponse = require("../../../../test/data/api/admin/lists/update-childNode-position-new-parent-to-end-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(repositionListNodeResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FnotUsedList015/position");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({ "Content-Type": "application/json; charset=utf-8" });

            const payload = require("../../../../test/data/api/admin/lists/update-childNode-position-new-parent-to-end-request.json");

            expect(request.data()).toEqual(payload);

        });
    });

});
