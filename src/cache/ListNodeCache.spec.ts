import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ListNode } from "../models/v2/lists/list-node";
import { ListNodeCache } from "./ListNodeCache";

describe("ListNodeCache", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, "", "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    let getNodeSpy: jasmine.Spy;
    let getListSpy: jasmine.Spy;
    let listNodeCache: ListNodeCache;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    const nodeJson = require("../../test/data/api/v2/lists/listnode-expanded.json");

    const listJson = require("../../test/data/api/v2/lists/treelist-expanded.json");

    beforeEach(() => {
        jasmine.Ajax.install();

        getNodeSpy = spyOn(knoraApiConnection.v2.list, "getNode").and.callFake(
            (nodeIri: string) => {

                const nodeResp = jsonConvert.deserialize(nodeJson, ListNode) as ListNode;

                // console.log("getNodeSpy", nodeResp)

                return of(nodeResp);

            }
        );

        getListSpy = spyOn(knoraApiConnection.v2.list, "getList").and.callFake(
            (nodeIri: string) => {

                const listResp = jsonConvert.deserialize(listJson, ListNode) as ListNode;

                // console.log("getListSpy ", listResp, " ", listJson)

                return of(listResp);

            }
        );

        listNodeCache = new ListNodeCache(knoraApiConnection);

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem()", () => {

        it("should get a list node from the cache", done => {

            listNodeCache["getItem"]("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNode) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();
                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]["hasCompleted"]).toBeTruthy();

                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is dependency of each list node

                // console.log(Object.keys(listNodeCache["cache"]));

                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();


                done();

            });
        });

    });

    describe("Method getNode()", () => {

        it("should get a list node from the cache", done => {

            listNodeCache.getNode("http://rdfh.ch/lists/0001/treeList01").subscribe((node: ListNode) => {

                expect(node.id).toEqual("http://rdfh.ch/lists/0001/treeList01");

                expect(getNodeSpy).toHaveBeenCalledTimes(1);
                expect(getNodeSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                expect(getListSpy).toHaveBeenCalledTimes(1);
                expect(getListSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList");

                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]).not.toBeUndefined();
                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList01"]["hasCompleted"]).toBeTruthy();

                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList"]).not.toBeUndefined(); // root node Iri is dependency of each list node

                // console.log(Object.keys(listNodeCache["cache"]));

                expect(listNodeCache["cache"]["http://rdfh.ch/lists/0001/treeList02"]).not.toBeUndefined();

                done();

            });
        });

    });

});
