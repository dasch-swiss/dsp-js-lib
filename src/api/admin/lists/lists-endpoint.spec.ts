import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { FullList, ProjectLists } from "../../../models/admin/lists";
describe("ListsEndpoint", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should return list of lists of system project", done => {

        knoraApiConnection.admin.listsEndpoint.getProjectLists("http://www.knora.org/ontology/knora-admin#SystemProject").subscribe(
            (lists: Array<ProjectLists>) => {
                expect(lists[0].id).toEqual("http://rdfh.ch/lists/FFFF/ynm01");
                expect(lists[0].comments).toBeDefined();
                if (lists[0].comments) {
                    expect(lists[0].comments.length).toEqual(2);
                }
                if (lists[0].comments && lists[0].comments.length > 0) {
                    expect(lists[0].comments[0].language).toEqual("de");
                    expect(lists[0].comments[0].value).toEqual("Diese Liste kann von allen Projekten verwendet werden.");
                }
                expect(lists[0].comments).toBeDefined();
                if (lists[0].comments && lists[0].comments.length > 1) {
                    expect(lists[0].comments[1].language).toEqual("en");
                    expect(lists[0].comments[1].value).toEqual("This list can be used by all projects.");
                }
                expect(lists[0].labels).toBeDefined();
                if (lists[0].labels) {
                    expect(lists[0].labels.length).toEqual(2);
                }
                if (lists[0].labels && lists[0].labels.length > 0) {
                    expect(lists[0].labels[0].language).toEqual("de");
                    expect(lists[0].labels[0].value).toEqual("Die Ja, Nein, Vielleicht Liste");
                }
                if (lists[0].labels && lists[0].labels.length > 1) {
                    expect(lists[0].labels[1].language).toEqual("en");
                    expect(lists[0].labels[1].value).toEqual("The Yes, No, Maybe List");

                }
                expect(lists[0].name).toBeDefined();
                expect(lists[0].name).toEqual("A name of a list");
                done();
            }
        );

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require("../../../../test/data/api/admin/lists/projectlists.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe("http://0.0.0.0:3333/admin/lists?projectIri=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-admin%23SystemProject");

        expect(request.method).toEqual("GET");

    });

    it("should return a full list", done => {

        knoraApiConnection.admin.listsEndpoint.getFullList("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ").subscribe(
            (fulllist: FullList) => {

                expect(fulllist.listinfo.id).toEqual("http://rdfh.ch/lists/0807/4HXuuotZSNGuW_wjz6KvuQ");
                expect(fulllist.listinfo.name).toEqual("articletype");
                expect(fulllist.listinfo.projectIri).toEqual("http://rdfh.ch/projects/0807");
                expect(fulllist.listinfo.labels).toBeDefined();
                expect(fulllist.listinfo.labels && fulllist.listinfo.labels.length).toEqual(1);
                if (fulllist.listinfo.labels && fulllist.listinfo.labels.length > 0) {
                    expect(fulllist.listinfo.labels[0].language).toEqual("de");
                    expect(fulllist.listinfo.labels[0].value).toEqual("Artikeltyp");
                }

                expect(fulllist.children.length).toBeGreaterThan(0);
                if (fulllist.children.length > 0) {
                    expect(fulllist.children[0].id).toEqual("http://rdfh.ch/lists/0807/BTpjWYm-SSClZv-LG7CC4Q");
                    expect(fulllist.children[0].position).toEqual(0);
                    expect(fulllist.children[0].name).toBeDefined();
                    if (fulllist.children[0].name) {
                        expect(fulllist.children[0].name).toEqual("person");
                    }
                    expect(fulllist.children[0].labels).toBeDefined();
                    if (fulllist.children[0].labels) {
                        expect(fulllist.children[0].labels.length).toEqual(1);
                        if (fulllist.children[0].labels.length > 0) {
                            expect(fulllist.children[0].labels[0].language).toEqual("de");
                            expect(fulllist.children[0].labels[0].value).toEqual("Person");
                        }
                    }
                }

                if (fulllist.children.length > 4) {
                    expect(fulllist.children[4].id).toEqual("http://rdfh.ch/lists/0807/54Cg6gIxTvu1166vyWKizg");
                    expect(fulllist.children[4].position).toEqual(4);
                    expect(fulllist.children[4].name).toBeDefined();
                    if (fulllist.children[4].name) {
                        expect(fulllist.children[4].name).toEqual("thing");
                    }
                    expect(fulllist.children[4].labels).toBeDefined();
                    if (fulllist.children[4].labels) {
                        expect(fulllist.children[4].labels.length).toEqual(1);
                        if (fulllist.children[4].labels.length > 0) {
                            expect(fulllist.children[4].labels[0].language).toEqual("de");
                            expect(fulllist.children[4].labels[0].value).toEqual("Sache");
                        }
                    }
                }

                done();

            }
        );

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require("../../../../test/data/api/admin/lists/fulllist.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe("http://0.0.0.0:3333/admin/lists/http%3A%2F%2Frdfh.ch%2Flists%2F0807%2F4HXuuotZSNGuW_wjz6KvuQ");

        expect(request.method).toEqual("GET");

    });
});
