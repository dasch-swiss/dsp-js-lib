import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { OntologiesMetadata, OntologyMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { ReadOntology } from "../../../models/v2/ontologies/read/read-ontology";
import { ResourceClassDefinition } from "../../../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../models/v2/ontologies/resource-property-definition";
import { SystemPropertyDefinition } from "../../../models/v2/ontologies/system-property-definition";

fdescribe("OntologiesEndpoint", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getOntologiesMetadata", () => {

        it("should return metadata about all ontologies", done => {

            knoraApiConnection.v2.onto.getOntologiesMetadata().subscribe(
                (response: OntologiesMetadata) => {
                    expect(response.ontologies.length).toEqual(15);
                    expect(response.ontologies[0].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const ontoMetadata = require("../../../../test/data/api/v2/ontologies/all-ontology-metadata-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(ontoMetadata)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/metadata");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getOntology", () => {

        it("should return an ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://api.knora.org/ontology/knora-api/v2").subscribe(
                (response: ReadOntology) => {

                    expect(response.id).toEqual("http://api.knora.org/ontology/knora-api/v2");
                    expect(response.label).toEqual("The knora-api ontology in the complex schema");

                    expect(response.dependsOnOntologies.size).toEqual(0);

                    expect(response.classes["http://api.knora.org/ontology/knora-api/v2#Annotation"] instanceof ResourceClassDefinition).toBeTruthy();
                    expect(response.classes["http://api.knora.org/ontology/knora-api/v2#Annotation"].id).toEqual("http://api.knora.org/ontology/knora-api/v2#Annotation");
                    expect(response.classes["http://api.knora.org/ontology/knora-api/v2#Annotation"].label).toEqual("Annotation");

                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#arkUrl"] instanceof SystemPropertyDefinition).toBeTruthy();
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#arkUrl"].id).toEqual("http://api.knora.org/ontology/knora-api/v2#arkUrl");
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#arkUrl"].label).toEqual("ARK URL");

                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#hasValue"] instanceof ResourcePropertyDefinition).toBeTruthy();
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#hasValue"].id).toEqual("http://api.knora.org/ontology/knora-api/v2#hasValue");
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#hasValue"].subPropertyOf).toEqual(["http://api.knora.org/ontology/knora-api/v2#resourceProperty"]);
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#hasValue"].subjectType).toEqual("http://api.knora.org/ontology/knora-api/v2#Resource");
                    expect(response.properties["http://api.knora.org/ontology/knora-api/v2#hasValue"].objectType).toEqual("http://api.knora.org/ontology/knora-api/v2#Value");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require("../../../../test/data/api/v2/ontologies/knora-api-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2");

            expect(request.method).toEqual("GET");

        });

        it("should return a project ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://0.0.0.0:3333/ontology/0001/anything/v2").subscribe(
                (response: ReadOntology) => {
                    expect(response.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");
                    expect(response.label).toEqual("The anything ontology");

                    expect(response.dependsOnOntologies.size).toEqual(1);
                    expect(response.dependsOnOntologies.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                    expect(response.classes["http://0.0.0.0:3333/ontology/0001/anything/v2#Thing"] instanceof ResourceClassDefinition);
                    expect(response.classes["http://0.0.0.0:3333/ontology/0001/anything/v2#Thing"].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");
                    expect(response.classes["http://0.0.0.0:3333/ontology/0001/anything/v2#Thing"].label).toEqual("Thing");
                    expect(response.classes["http://0.0.0.0:3333/ontology/0001/anything/v2#Thing"].comment).toEqual("'The whole world is full of things, which means there's a real need for someone to go searching for them. And that's exactly what a thing-searcher does.' --Pippi Longstocking");

                    expect(response.classes["http://0.0.0.0:3333/ontology/0001/anything/v2#Thing"].propertiesList.length).toEqual(39);

                    expect(response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal"] instanceof ResourcePropertyDefinition);
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal"] as ResourcePropertyDefinition).isEditable).toBeTruthy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal"] as ResourcePropertyDefinition).isLinkProperty).toBeFalsy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal"] as ResourcePropertyDefinition).isLinkValueProperty).toBeFalsy();

                    expect(response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing"] instanceof ResourcePropertyDefinition);
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing"] as ResourcePropertyDefinition).isEditable).toBeTruthy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing"] as ResourcePropertyDefinition).isLinkProperty).toBeTruthy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing"] as ResourcePropertyDefinition).isLinkValueProperty).toBeFalsy();

                    expect(response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue"] instanceof ResourcePropertyDefinition);
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue"] as ResourcePropertyDefinition).isEditable).toBeTruthy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue"] as ResourcePropertyDefinition).isLinkProperty).toBeFalsy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue"] as ResourcePropertyDefinition).isLinkValueProperty).toBeTruthy();

                    expect(response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem"] instanceof ResourcePropertyDefinition);
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem"] as ResourcePropertyDefinition).isEditable).toBeTruthy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem"] as ResourcePropertyDefinition).isLinkProperty).toBeFalsy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem"] as ResourcePropertyDefinition).isLinkValueProperty).toBeFalsy();
                    expect((response.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem"] as ResourcePropertyDefinition).guiAttributes).toEqual(["hlist=<http://rdfh.ch/lists/0001/treeList>"]);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require("../../../../test/data/api/v2/ontologies/anything-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fanything%2Fv2");

            expect(request.method).toEqual("GET");

        });

        it("should return a very simple project ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://0.0.0.0:3333/ontology/0001/minimal/v2").subscribe(
                (response: ReadOntology) => {

                    expect(response.id).toEqual("http://0.0.0.0:3333/ontology/0001/minimal/v2");
                    expect(response.label).toEqual("A minimal ontology");

                    expect(response.dependsOnOntologies.size).toEqual(1);
                    expect(response.dependsOnOntologies.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require("../../../../test/data/api/v2/ontologies/minimal-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fminimal%2Fv2");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getOntologiesByProjectIri", () => {

        it("should return all ontologies from 'anything' project", done => {

            knoraApiConnection.v2.onto.getOntologiesByProjectIri("http://rdfh.ch/projects/0001").subscribe(
                (response: OntologiesMetadata) => {
                    expect(response.ontologies.length).toEqual(3);
                    expect(response.ontologies[0].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");
                    expect(response.ontologies[1].id).toEqual("http://0.0.0.0:3333/ontology/0001/minimal/v2");
                    expect(response.ontologies[2].id).toEqual("http://0.0.0.0:3333/ontology/0001/something/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const ontoMetadata = require("../../../../test/data/api/v2/ontologies/get-ontologies-project-anything-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(ontoMetadata)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/metadata/http%3A%2F%2Frdfh.ch%2Fprojects%2F0001");

            expect(request.method).toEqual("GET");

        });

        it("should return all ontologies from 'incunabula' project", done => {

            knoraApiConnection.v2.onto.getOntologiesByProjectIri("http://rdfh.ch/projects/0803").subscribe(
                (response: OntologiesMetadata) => {
                    expect(response.ontologies.length).toEqual(1);
                    expect(response.ontologies[0].id).toEqual("http://0.0.0.0:3333/ontology/0803/incunabula/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const ontoMetadata = require("../../../../test/data/api/v2/ontologies/get-ontologies-project-incunabula-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(ontoMetadata)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/metadata/http%3A%2F%2Frdfh.ch%2Fprojects%2F0803");

            expect(request.method).toEqual("GET");

        });

    });


});
