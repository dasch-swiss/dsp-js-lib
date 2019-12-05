import { of } from "rxjs";
import { CreateBooleanValue } from "../../..";
import { MockList } from "../../../../test/data/api/v2/mockList";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { CreateResource } from "../../../models/v2/resources/create/create-resource";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { UpdateResourceMetadata } from "../../../models/v2/resources/update/update-resource-metadata";
import { UpdateResourceMetadataResponse } from "../../../models/v2/resources/update/update-resource-metadata-response";

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

        it("should create a resource", done => {

            const createResource = new CreateResource();

            createResource.label = "testding";

            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            createResource.attachedToProject = "http://rdfh.ch/projects/0001";

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

            const createResourceResponse = {
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "@type": "anything:Thing",
                "rdfs:label": "testding",
                "knora-api:attachedToProject": {
                    "@id": "http://rdfh.ch/projects/0001"
                },
                "knora-api:attachedToUser": {
                    "@id": "http://rdfh.ch/users/BhkfBc3hTeS_IDo-JgXRbQ"
                },
                "knora-api:hasPermissions": "CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:KnownUser|RV knora-admin:UnknownUser",
                "knora-api:userHasPermission": "RV",
                "knora-api:arkUrl": {
                    "@type": "xsd:anyURI",
                    "@value": "http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk"
                }, "knora-api:versionArkUrl": {
                    "@type": "xsd:anyURI",
                    "@value": "http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk.20180528T155203897Z"
                },
                "knora-api:creationDate": {
                    "@type": "xsd:dateTimeStamp",
                    "@value": "2018-05-28T15:52:03.897Z"
                },
                "@context": {
                    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                    "knora-api": "http://api.knora.org/ontology/knora-api/v2#",
                    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "anything": "http://0.0.0.0:3333/ontology/0001/anything/v2#"
                }
            };

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResourceResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/resources");

            expect(request.method).toEqual("POST");

            const expectedPayload = {
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "http://www.w3.org/2000/01/rdf-schema#label": "testding",
                "http://api.knora.org/ontology/knora-api/v2#attachedToProject": {"@id": "http://rdfh.ch/projects/0001"},
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean": [{
                    "@type": "http://api.knora.org/ontology/knora-api/v2#BooleanValue",
                    "http://api.knora.org/ontology/knora-api/v2#booleanValueAsBoolean": true
                }]
            };

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("method updateResourceMetadata", () => {

        it("should update a resource's metadata", done => {

            const updateResourceMetadata = new UpdateResourceMetadata();

            updateResourceMetadata.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";

            updateResourceMetadata.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            updateResourceMetadata.label = "Das Ding der Dinge";

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

            const expectedPayload = {
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "http://www.w3.org/2000/01/rdf-schema#label": "Das Ding der Dinge"
            };

            expect(request.data()).toEqual(expectedPayload);

        });

    });

});
