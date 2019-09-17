import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ListNode } from "../../../models/v2/lists/list-node";

describe("ListsEndpoint", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should return a list", done => {

        knoraApiConnection.v2.list.getList("http://rdfh.ch/lists/0001/treeList").subscribe(
            (list: ListNode) => {

                expect(list.id).toEqual("http://rdfh.ch/lists/0001/treeList");
                expect(list.children.length).toEqual(3);

                done();
            }
        );

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require("../../../../test/data/api/v2/lists/treelist.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe("http://api.dasch.swiss/v2/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList");

        expect(request.method).toEqual("GET");

    });

    it("should return a list node", done => {

        knoraApiConnection.v2.list.getNode("http://rdfh.ch/lists/0001/treeList01").subscribe(
            (list: ListNode) => {

                expect(list.id).toEqual("http://rdfh.ch/lists/0001/treeList01");
                expect(list.children.length).toEqual(0);

                done();
            }
        );

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require("../../../../test/data/api/v2/lists/listnode.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe("http://api.dasch.swiss/v2/node/http%3A%2F%2Frdfh.ch%2Flists%2F0001%2FtreeList01");

        expect(request.method).toEqual("GET");

    });

});
