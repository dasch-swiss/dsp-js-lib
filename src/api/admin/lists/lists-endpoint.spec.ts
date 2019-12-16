import { ApiResponseData } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ListResponse } from "../../../models/admin/list-response";
import { ListsResponse } from "../../../models/admin/lists-response";

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

    describe("Method getList", () => {

        it("should return a list", done => {

            knoraApiConnection.admin.listsEndpoint.getList("http://rdfh.ch/lists/0001/treeList").subscribe(
                (res: ApiResponseData<ListResponse>) => {
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

});
