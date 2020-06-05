import { of } from "rxjs";
import { AjaxError } from "rxjs/ajax";
import { MockList } from "../../../../test/data/api/v2/mockList";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ApiResponseError } from "../../../models/api-response-error";
import { CreateResource } from "../../../models/v2/resources/create/create-resource";
import { DeleteResource } from "../../../models/v2/resources/delete/delete-resource";
import { DeleteResourceResponse } from "../../../models/v2/resources/delete/delete-resource-response";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { ReadResourceSequence } from "../../../models/v2/resources/read/read-resource-sequence";
import { UpdateResourceMetadata } from "../../../models/v2/resources/update/update-resource-metadata";
import { UpdateResourceMetadataResponse } from "../../../models/v2/resources/update/update-resource-metadata-response";
import { CreateBooleanValue } from "../../../models/v2/resources/values/create/create-boolean-value";
import { CreateColorValue } from "../../../models/v2/resources/values/create/create-color-value";
import { CreateDateValue } from "../../../models/v2/resources/values/create/create-date-value";
import { CreateDecimalValue } from "../../../models/v2/resources/values/create/create-decimal-value";
import { CreateGeomValue } from "../../../models/v2/resources/values/create/create-geom-value";
import { CreateGeonameValue } from "../../../models/v2/resources/values/create/create-geoname-value";
import { CreateIntValue } from "../../../models/v2/resources/values/create/create-int-value";
import { CreateIntervalValue } from "../../../models/v2/resources/values/create/create-interval-value";
import { CreateLinkValue } from "../../../models/v2/resources/values/create/create-link-value";
import { CreateListValue } from "../../../models/v2/resources/values/create/create-list-value";
import {
    CreateTextValueAsString,
    CreateTextValueAsXml
} from "../../../models/v2/resources/values/create/create-text-value";
import { CreateTimeValue } from "../../../models/v2/resources/values/create/create-time-value";
import { CreateUriValue } from "../../../models/v2/resources/values/create/create-uri-value";

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

        it("should unsuccessfully attempt to get a resource", done => {

            knoraApiConnection.v2.res.getResource("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw").subscribe(
                (response: ReadResource) => {
                },
                (err: ApiResponseError) => {
                    expect(err instanceof ApiResponseError).toBeTruthy();
                    expect(err.status).toEqual(404);
                    expect(err.error instanceof AjaxError).toBeTruthy();
                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockNotFoundResponse());

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw");

            expect(request.method).toEqual("GET");

        });

        it("should return several resource", done => {

            knoraApiConnection.v2.res.getResources(["http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "http://rdfh.ch/0001/uqmMo72OQ2K2xe7mkIytlg"]).subscribe((response: ReadResourceSequence) => {

                expect(response.resources.length).toEqual(2);

                done();
            });

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/http%3A%2F%2Frdfh.ch%2F0001%2FuqmMo72OQ2K2xe7mkIytlg");

            expect(request.method).toEqual("GET");

        });

        it("should unsuccessfully attempt to several resource", done => {

            knoraApiConnection.v2.res.getResources(["http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "http://rdfh.ch/0001/uqmMo72OQ2K2xe7mkIytlg"]).subscribe(
                (response: ReadResourceSequence) => {
                }, (err: ApiResponseError) => {
                    expect(err instanceof ApiResponseError).toBeTruthy();
                    expect(err.status).toEqual(404);
                    expect(err.error instanceof AjaxError).toBeTruthy();
                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/resources/things.json");

            request.respondWith(MockAjaxCall.mockNotFoundResponse());

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/http%3A%2F%2Frdfh.ch%2F0001%2FuqmMo72OQ2K2xe7mkIytlg");

            expect(request.method).toEqual("GET");

        });

    });

    describe("method createResource", () => {

        const createResourceResponse = require("../../../../test/data/api/v2/resources/resource-preview.json");

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

            const timeVal = new CreateTimeValue();
            timeVal.time = "2020-01-24T08:47:10.307068Z";

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
                ],
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasTimeStamp": [
                    timeVal
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

            // TODO: remove this once https://github.com/dasch-swiss/knora-api-js-lib/issues/126 is done
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal"]["http://api.knora.org/ontology/knora-api/v2#decimalValueAsDecimal"]["@value"] = "1.5";

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should unsuccessfully attempt to create a resource with values", done => {

            const createResource = new CreateResource();

            knoraApiConnection.v2.res.createResource(createResource).subscribe(
                (res: ReadResource) => {
                },
                (err: ApiResponseError) => {
                    expect(err instanceof ApiResponseError).toBeTruthy();
                    expect(err.status).toEqual(400);
                    expect(err.error instanceof AjaxError).toBeTruthy();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockBadRequestResponse());

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("POST");

        });

        it("create a resource as a specific user", done => {

            const createResource = new CreateResource();

            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            createResource.label = "test thing";

            createResource.attachedToProject = "http://rdfh.ch/projects/0001";

            createResource.attachedToUser = "http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q";

            const boolVal = new CreateBooleanValue();
            boolVal.bool = true;

            const props = {
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean": [
                    boolVal
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

            const expectedPayload = require("../../../../test/data/api/v2/resources/create-resource-as-user-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("create a resource as a specific custom creation date", done => {

            const createResource = new CreateResource();

            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            createResource.label = "test thing";

            createResource.attachedToProject = "http://rdfh.ch/projects/0001";

            createResource.creationDate = "2019-01-09T15:45:54.502951Z";

            const boolVal = new CreateBooleanValue();
            boolVal.bool = true;

            const props = {
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean": [
                    boolVal
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

            const expectedPayload = require("../../../../test/data/api/v2/resources/create-resource-with-custom-creation-date-expanded.json");

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

        const updateResResponse = require("../../../../test/data/api/v2/resources/update-resource-metadata-response.json");

        it("should update a resource's label", done => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.id = "http://rdfh.ch/0001/a-thing";

            updateResourceMetadata.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            updateResourceMetadata.label = "test thing with modified label";

            updateResourceMetadata.hasPermissions = "CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:ProjectMember";

            updateResourceMetadata.newModificationDateDate = "2019-12-12T10:23:25.836924Z";

            knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata).subscribe(
                (res: UpdateResourceMetadataResponse) => {
                    expect(res.result).toEqual("Resource metadata updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(updateResResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/resources/update-resource-metadata-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should unsuccessfully attempt to update a resource's label", done => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.label = "test thing with modified label";

            knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata).subscribe(
                (res: UpdateResourceMetadataResponse) => {
                },
                (err: ApiResponseError) => {
                    expect(err instanceof ApiResponseError).toBeTruthy();
                    expect(err.status).toEqual(400);
                    expect(err.error instanceof AjaxError).toBeTruthy();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockBadRequestResponse());

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("PUT");

        });

        it("should update a resource's label submitting the last modification date", done => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.id = "http://rdfh.ch/0001/a-thing";

            updateResourceMetadata.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            updateResourceMetadata.label = "test thing with modified label";

            updateResourceMetadata.hasPermissions = "CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:ProjectMember";

            updateResourceMetadata.lastModificationDateDate = "2019-02-13T09:05:10Z";

            updateResourceMetadata.newModificationDateDate = "2019-12-12T10:23:25.836924Z";

            knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata).subscribe(
                (res: UpdateResourceMetadataResponse) => {
                    expect(res.result).toEqual("Resource metadata updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(updateResResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/resources/update-resource-metadata-request-with-last-mod-date-expanded.json");

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

            deleteResource.lastModificationDateDate = "2019-12-12T10:23:25.836924Z";

            knoraApiConnection.v2.res.deleteResource(deleteResource).subscribe(
                (res: DeleteResourceResponse) => {
                    expect(res.result).toEqual("Resource marked as deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const deleteResResponse = require("../../../../test/data/api/v2/resources/delete-resource-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(deleteResResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/delete");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/resources/delete-resource-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should unsuccessfully attempt to delete a resource", done => {

            const deleteResource = new DeleteResource();

            knoraApiConnection.v2.res.deleteResource(deleteResource).subscribe(
                (res: DeleteResourceResponse) => {
                },
                (err: ApiResponseError) => {
                    expect(err instanceof ApiResponseError).toBeTruthy();
                    expect(err.status).toEqual(400);
                    expect(err.error instanceof AjaxError).toBeTruthy();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockBadRequestResponse());

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources/delete");

            expect(request.method).toEqual("POST");

        });

    });

});
