import { JsonConvert, OperationMode, PropertyMatchingRule, ValueCheckingMode } from "json2typescript";
import { of } from "rxjs";
import { MockList } from "../../test/data/api/v2/mock-list";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ListNodeV2 } from "../models/v2/lists/list-node-v2";

describe("ListNodeV2Cache", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, "", "", true);
    let knoraApiConnection: KnoraApiConnection;

    let getNodeSpy: jasmine.Spy;
    let getListSpy: jasmine.Spy;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    beforeEach(() => {
        jasmine.Ajax.install();

        knoraApiConnection  = new KnoraApiConnection(config);

        getNodeSpy = spyOn(knoraApiConnection.v2.list, "getNode").and.callFake(
            (nodeIri: string) => {

                return of(MockList.mockNode(nodeIri));

            }
        );

        getListSpy = spyOn(knoraApiConnection.v2.list, "getList").and.callFake(
            (nodeIri: string) => {

                return of(MockList.mockList(nodeIri));

            }
        );

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem()", () => {

        it("should get a list node from the cache", done => {

            knoraApiConnection.v2.listNodeCache["getItem"]("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNodeV2) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is a dependency of each list node

                // since the test uses a sync Observable to retrieve the whole list, the information is present
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList03"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList10"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList11"]).not.toBeUndefined();

                done();

            });
        });

        it("should get a list node from the cache several times asynchronously", done => {

            knoraApiConnection.v2.listNodeCache["getItem"]("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNodeV2) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is a dependency of each list node

                // since the test uses a sync Observable to retrieve the whole list, the information is present
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList03"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList10"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList11"]).not.toBeUndefined();

                done();

            });

            knoraApiConnection.v2.listNodeCache["getItem"]("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNodeV2) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is a dependency of each list node

                // since the test uses a sync Observable to retrieve the whole list, the information is present
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList03"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList10"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList11"]).not.toBeUndefined();

                done();

            });

            knoraApiConnection.v2.listNodeCache["getItem"]("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNodeV2) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is a dependency of each list node

                // since the test uses a sync Observable to retrieve the whole list, the information is present
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList03"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList10"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList11"]).not.toBeUndefined();

                done();

            });
        });

    });

    describe("Method getNode()", () => {

        it("should get a list node from the cache", done => {

            knoraApiConnection.v2.listNodeCache.getNode("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNodeV2) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();

                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is a dependency of each list node

                // since the test uses a sync Observable to retrieve the whole list, the information is present
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList03"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList10"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList11"]).not.toBeUndefined();

                done();

            });
        });

    });

});
