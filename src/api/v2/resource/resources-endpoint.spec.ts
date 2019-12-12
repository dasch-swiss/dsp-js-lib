import { of } from "rxjs";
import {
    CreateBooleanValue,
    CreateColorValue,
    CreateDateValue,
    CreateDecimalValue,
    CreateGeomValue, CreateIntervalValue,
    CreateIntValue, CreateLinkValue, CreateListValue, CreateTextValueAsString, CreateTextValueAsXml, CreateUriValue
} from "../../..";
import { MockList } from "../../../../test/data/api/v2/mockList";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { CreateResource } from "../../../models/v2/resources/create/create-resource";
import { DeleteResource } from "../../../models/v2/resources/delete/delete-resource";
import { DeleteResourceResponse } from "../../../models/v2/resources/delete/delete-resource-response";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { UpdateResourceMetadata } from "../../../models/v2/resources/update/update-resource-metadata";
import { UpdateResourceMetadataResponse } from "../../../models/v2/resources/update/update-resource-metadata-response";
import { CreateGeonameValue } from "../../../models/v2/resources/values/create/create-geoname-value";

describe("ResourcesEndpoint", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, "", true);
    let knoraApiConnection: KnoraApiConnection;

    let getResourceClassDefinitionFromCacheSpy: jasmine.Spy;
    let getListNodeFromCacheSpy: jasmine.Spy;

    beforeEach(() => {

        jasmine.Ajax.install();

        knoraApiConnection = new KnoraApiConnection(config);

        getResourceClassDefinitionFromCacheSpy = spyOn(knoraApiConnection.v2.ontologyCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri));
            }
        );

        getListNodeFromCacheSpy = spyOn(knoraApiConnection.v2.listNodeCache, "getNode").and.callFake(
            (listNodeIri: string) => {
                return MockList.mockCompletedAsyncSubject(listNodeIri);
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("method getResource", () => {

        it("should return a resource", done => {

            knoraApiConnection.v2.res.getResource("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw").subscribe((response: ReadResource) => {

                expect(response.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw");
                expect(response.resourceClassLabel).toEqual("Thing");

                expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(2);
                expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                done();
            });

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/testding.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw");

            expect(request.method).toEqual("GET");

        });

        it("should return several resource", done => {

            knoraApiConnection.v2.res.getResources(["http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "http://rdfh.ch/0001/uqmMo72OQ2K2xe7mkIytlg"]).subscribe((response: ReadResource[]) => {

                expect(response.length).toEqual(2);

                done();
            });

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/http%3A%2F%2Frdfh.ch%2F0001%2FuqmMo72OQ2K2xe7mkIytlg");

            expect(request.method).toEqual("GET");

        });

    });

    describe("method createResource", () => {

        const createResourceResponse = require("../../../../test/data/api/v2/resources/resource-preview-expanded.json");

        it("should create a resource with values", done => {

            const createResource = new CreateResource();

            createResource.label = "test thing";

            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            createResource.attachedToProject = "http://rdfh.ch/projects/0001";

            const boolVal = new CreateBooleanValue();
            boolVal.bool = true;

            const colorVal = new CreateColorValue();
            colorVal.color = "#ff3333";

            const dateVal = new CreateDateValue();
            dateVal.calendar = "GREGORIAN";
            dateVal.startEra = "CE";
            dateVal.startYear = 1489;
            dateVal.endEra = "CE";
            dateVal.endYear = 1489;

            const decVal = new CreateDecimalValue();
            decVal.decimal = 1.5;

            const geomVal = new CreateGeomValue();
            geomVal.geometryString =
                "{\"status\":\"active\",\"lineColor\":\"#ff3333\",\"lineWidth\":2,\"points\":[{\"x\":0.08098591549295775,\"y\":0.16741071428571427},{\"x\":0.7394366197183099,\"y\":0.7299107142857143}],\"type\":\"rectangle\",\"original_index\":0}";

            const geonameVal = new CreateGeonameValue();
            geonameVal.geoname = "2661604";

            const intVal = new CreateIntValue();
            intVal.int = 5;
            intVal.hasPermissions = "CR knora-admin:Creator|V http://rdfh.ch/groups/0001/thing-searcher";
            intVal.valueHasComment = "this is the number five";

            const intVal2 = new CreateIntValue();
            intVal2.int = 6;

            const intervalVal = new CreateIntervalValue();
            intervalVal.start = 1.2;
            intervalVal.end = 3.4;

            const listVal = new CreateListValue();
            listVal.listNode = "http://rdfh.ch/lists/0001/treeList03";

            const linkVal = new CreateLinkValue();
            linkVal.linkedResourceIri = "http://rdfh.ch/0001/a-thing";

            const textValStandoff = new CreateTextValueAsXml();
            textValStandoff.xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text><p><strong>this is</strong> text</p> with standoff</text>";
            textValStandoff.mapping = "http://rdfh.ch/standoff/mappings/StandardMapping";

            const textValString = new CreateTextValueAsString();
            textValString.text = "this is text without standoff";

            const uriVal = new CreateUriValue();
            uriVal.uri = "https://www.knora.org";

            const props = {
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean": [
                    boolVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor": [
                    colorVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate": [
                    dateVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal": [
                    decVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeometry": [
                    geomVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeoname": [
                    geonameVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger": [
                    intVal, intVal2
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval": [
                    intervalVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem": [
                    listVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue": [
                    linkVal
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext": [
                    textValStandoff
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText": [
                    textValString
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri": [
                    uriVal
                ]
            };

            createResource.properties = props;

            knoraApiConnection.v2.res.createResource(createResource).subscribe(
                (res: ReadResource) => {
                    expect(res.type).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResourceResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/resources/create-resource-with-values-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should attempt to create a resource with a property without values", () => {

            const createResource = new CreateResource();

            createResource.label = "testding";

            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            createResource.attachedToProject = "http://rdfh.ch/projects/0001";

            const props = {
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean": []
            };

            createResource.properties = props;

            expect(
                () => {
                    knoraApiConnection.v2.res.createResource(createResource);
                }).toThrow(new Error("No values defined for http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean"));

        });

    });

    describe("method updateResourceMetadata", () => {

        it("should update a resource's label", done => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.id = "http://rdfh.ch/0001/a-thing";

            updateResourceMetadata.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            updateResourceMetadata.label = "test thing with modified label";

            updateResourceMetadata.hasPermissions = "CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:ProjectMember";

            updateResourceMetadata.newModificationDateDate = "2019-12-12T15:38:51.329Z";

            knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata).subscribe(
                (res: UpdateResourceMetadataResponse) => {
                    expect(res.result).toEqual("Resource metadata updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const updateResResponse = {
                "knora-api:result": "Resource metadata updated",
                "@context": {
                    "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                }
            };

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(updateResResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/resources/update-resource-metadata-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should update a resource's label submitting the last modification date", done => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.id = "http://rdfh.ch/0001/a-thing";

            updateResourceMetadata.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            updateResourceMetadata.label = "test thing with modified label";

            updateResourceMetadata.hasPermissions = "CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:ProjectMember";

            updateResourceMetadata.lastModificationDateDate = "2019-02-13T09:05:10Z";

            updateResourceMetadata.newModificationDateDate = "2019-12-13T09:13:57.518Z";

            knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata).subscribe(
                (res: UpdateResourceMetadataResponse) => {
                    expect(res.result).toEqual("Resource metadata updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const updateResResponse = {
                "knora-api:result": "Resource metadata updated",
                "@context": {
                    "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                }
            };

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(updateResResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/resources/update-resource-metadata-request-with-last-mod-date-expanded.json");
// update-resource-metadata-request-with-last-mod-date-expanded.json
            expect(request.data()).toEqual(expectedPayload);

        });

        it("should attempt to update a resource's metadata without any required property", () => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";

            updateResourceMetadata.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            expect(
                () => {
                    knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata);
                }).toThrow(new Error("At least one of the following properties has to be updated: label, hasPermissions, newModificationDateDate"));

        });

    });

    describe("method deleteResource", () => {

        it("should delete a resource", done => {

            const deleteResource = new DeleteResource();

            deleteResource.id = "http://rdfh.ch/0001/a-thing";

            deleteResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            deleteResource.deleteComment = "This resource is too boring.";

            deleteResource.lastModificationDateDate = "2019-12-11T15:38:51.330Z";

            knoraApiConnection.v2.res.deleteResource(deleteResource).subscribe(
                (res: DeleteResourceResponse) => {
                    expect(res.result).toEqual("Resource marked as deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const updateResResponse = {
                "knora-api:result": "Resource marked as deleted",
                "@context": {
                    "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                }
            };

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(updateResResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/delete");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/resources/delete-resource-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

    });

});
