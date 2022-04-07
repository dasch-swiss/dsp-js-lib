import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ApiResponseError } from "../../../models/api-response-error";
import { Constants } from "../../../models/v2/Constants";
import { Cardinality } from "../../../models/v2/ontologies/class-definition";
import { CreateOntology } from "../../../models/v2/ontologies/create/create-ontology";
import { CreateResourceClass } from "../../../models/v2/ontologies/create/create-resource-class";
import { CreateResourceProperty } from "../../../models/v2/ontologies/create/create-resource-property";
import { DeleteOntology } from "../../../models/v2/ontologies/delete/delete-ontology";
import { DeleteOntologyResponse } from "../../../models/v2/ontologies/delete/delete-ontology-response";
import { DeleteResourceClass } from "../../../models/v2/ontologies/delete/delete-resource-class";
import { DeleteResourceProperty } from "../../../models/v2/ontologies/delete/delete-resource-property";
import { OntologiesMetadata, OntologyMetadata } from "../../../models/v2/ontologies/ontology-metadata";
import { CanDoResponse } from "../../../models/v2/ontologies/read/can-do-response";
import { ReadOntology } from "../../../models/v2/ontologies/read/read-ontology";
import {
    ResourceClassDefinition,
    ResourceClassDefinitionWithAllLanguages
} from "../../../models/v2/ontologies/resource-class-definition";
import {
    ResourcePropertyDefinition,
    ResourcePropertyDefinitionWithAllLanguages
} from "../../../models/v2/ontologies/resource-property-definition";
import { StandoffClassDefinition } from "../../../models/v2/ontologies/standoff-class-definition";
import { SystemPropertyDefinition } from "../../../models/v2/ontologies/system-property-definition";
import { UpdateOntology } from "../../../models/v2/ontologies/update/update-ontology";
import { UpdateOntologyMetadata } from "../../../models/v2/ontologies/update/update-ontology-metadata";
import { UpdateResourceClassCardinality } from "../../../models/v2/ontologies/update/update-resource-class-cardinality";
import { UpdateResourceClassComment } from "../../../models/v2/ontologies/update/update-resource-class-comment";
import { UpdateResourceClassLabel } from "../../../models/v2/ontologies/update/update-resource-class-label";
import { UpdateResourcePropertyComment } from "../../../models/v2/ontologies/update/update-resource-property-comment";
import { UpdateResourcePropertyLabel } from "../../../models/v2/ontologies/update/update-resource-property-label";
import { StringLiteralV2 } from "../../../models/v2/string-literal-v2";

describe("OntologiesEndpoint", () => {

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

                    const classDefs = response.getAllClassDefinitions();
                    expect(classDefs.length).toEqual(9);
                    expect(classDefs[0] instanceof ResourceClassDefinition).toBeTruthy();
                    expect((classDefs[0] as ResourceClassDefinition).id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing");

                    const resClassDefs = response.getClassDefinitionsByType(ResourceClassDefinition);
                    expect(resClassDefs.length).toEqual(8);
                    expect(resClassDefs[0].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing");

                    const standoffClassDefs = response.getClassDefinitionsByType(StandoffClassDefinition);
                    expect(standoffClassDefs.length).toEqual(1);
                    expect(standoffClassDefs[0].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#StandoffEventTag");

                    const systemProps: SystemPropertyDefinition[] = response.getPropertyDefinitionsByType(SystemPropertyDefinition);
                    expect(systemProps.length).toEqual(1);
                    expect(systemProps[0] instanceof SystemPropertyDefinition).toBe(true);
                    expect(systemProps[0].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#standoffEventTagHasDescription");

                    const resourceProps: ResourcePropertyDefinition[] = response.getPropertyDefinitionsByType(ResourcePropertyDefinition);
                    expect(resourceProps.length).toEqual(28);
                    expect(resourceProps[0] instanceof ResourcePropertyDefinition).toBe(true);

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

        it("should return an ontology with labels and comments in all languages", done => {

            knoraApiConnection.v2.onto.getOntology("http://0.0.0.0:3333/ontology/0001/minimal/v2", true).subscribe(
                (response: ReadOntology) => {

                    expect(response.getPropertyDefinitionsByType(ResourcePropertyDefinitionWithAllLanguages).length).toEqual(1);

                    expect(response.getPropertyDefinitionsByType(ResourcePropertyDefinitionWithAllLanguages)[0].labels[0].value).toEqual("has name");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require("../../../../test/data/api/v2/manually-generated/minimal-ontology-with-all-languages-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fminimal%2Fv2?allLanguages=true");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getOntologiesByProjectIri", () => {

        it("should return all ontologies from 'anything' project", done => {

            knoraApiConnection.v2.onto.getOntologiesByProjectIri("http://rdfh.ch/projects/0001").subscribe(
                (response: OntologiesMetadata) => {
                    expect(response.ontologies.length).toEqual(4);
                    expect(response.ontologies[0].id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");
                    expect(response.ontologies[1].id).toEqual("http://0.0.0.0:3333/ontology/0001/freetest/v2");
                    expect(response.ontologies[2].id).toEqual("http://0.0.0.0:3333/ontology/0001/minimal/v2");
                    expect(response.ontologies[3].id).toEqual("http://0.0.0.0:3333/ontology/0001/something/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const ontoMetadata = require("../../../../test/data/api/v2/ontologies/get-ontologies-project-anything-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(ontoMetadata)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/metadata/http%3A%2F%2Frdfh.ch%2Fprojects%2F0001");

            expect(request.method).toEqual("GET");

        });

        it("should return an empty list when no ontologies exist yet for a given project", done => {

            knoraApiConnection.v2.onto.getOntologiesByProjectIri("http://rdfh.ch/projects/0001").subscribe(
                (response: OntologiesMetadata) => {
                    expect(response.ontologies.length).toEqual(0);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            // empty response because no ontologies exist for the project
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({})));

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

    describe("Method createOntology", () => {
        it("should create a new ontology", done => {

            const newOntology: CreateOntology = new CreateOntology();
            newOntology.attachedToProject = "http://rdfh.ch/projects/0001";
            newOntology.label = "The foo ontology";
            newOntology.name = "foo";

            knoraApiConnection.v2.onto.createOntology(newOntology).subscribe(
                (response: OntologyMetadata) => {
                    expect(response.id).toBe("http://0.0.0.0:3333/ontology/0001/foo/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const createOntologyResponse = require("../../../../test/data/api/v2/ontologies/create-empty-foo-ontology-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createOntologyResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/create-empty-foo-ontology-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

    });

    describe("Method canDeleteOntology", () => {

        it("should check if an ontology can be deleted", done => {

            const ontologyIri = "http://0.0.0.0:3333/ontology/0001/foo/v2";

            knoraApiConnection.v2.onto.canDeleteOntology(ontologyIri).subscribe(
                (res: CanDoResponse) => {
                    expect(res.canDo).toBeTrue();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const canDeleteOntoResponse = require("../../../../test/data/api/v2/ontologies/can-do-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(canDeleteOntoResponse)));

            expect(request.url).toEqual("http://0.0.0.0:3333/v2/ontologies/candeleteontology/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Ffoo%2Fv2");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method deleteOntology", () => {

        it("should delete an ontology", done => {

            const ontoInfo = new DeleteOntology();

            ontoInfo.id = "http://0.0.0.0:3333/ontology/0001/foo/v2";

            ontoInfo.lastModificationDate = "2020-06-29T13:33:46.059576Z";

            knoraApiConnection.v2.onto.deleteOntology(ontoInfo).subscribe(
                (res: DeleteOntologyResponse) => {
                    expect(res.result).toEqual("Ontology http://0.0.0.0:3333/ontology/0001/foo/v2 has been deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const deleteOntoResponse = require("../../../../test/data/api/v2/ontologies/delete-foo-ontology-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(deleteOntoResponse)));

            const path = "http://0.0.0.0:3333/v2/ontologies/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Ffoo%2Fv2?lastModificationDate=2020-06-29T13%3A33%3A46.059576Z";
            expect(request.url).toBe(path);

            expect(request.method).toEqual("DELETE");

        });

    });

    describe("Method updateOntology", () => {
        it("should update the label and comment of an ontology", done => {

            const ontoInfo = new UpdateOntologyMetadata();

            ontoInfo.id = "http://0.0.0.0:3333/ontology/0001/foo/v2";

            ontoInfo.lastModificationDate = "2020-06-29T13:33:46.059576Z";

            ontoInfo.label = "New onto label";

            ontoInfo.comment = "New onto comment";

            knoraApiConnection.v2.onto.updateOntology(ontoInfo).subscribe(
                (res: OntologyMetadata) => {
                    expect(res.label).toEqual("New onto label");
                    expect(res.comment).toEqual("New onto comment");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const updateOntoResponse = require("../../../../test/data/api/v2/manually-generated/update-ontology-label-and-comment-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(updateOntoResponse)));

            const path = "http://0.0.0.0:3333/v2/ontologies/metadata";

            expect(request.url).toBe(path);

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/manually-generated/update-ontology-label-and-comment-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should remove the comment of an ontology", done => {

            const ontoInfo = new UpdateOntologyMetadata();

            ontoInfo.id = "http://0.0.0.0:3333/ontology/0001/foo/v2";

            ontoInfo.lastModificationDate = "2020-06-29T13:33:46.059576Z";

            knoraApiConnection.v2.onto.deleteOntologyComment(ontoInfo).subscribe(
                (res: OntologyMetadata) => {
                    expect(res.label).toEqual("Test Onto")
                    expect(res.comment).toBeUndefined;
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const deleteOntoComment = require("../../../../test/data/api/v2/manually-generated/remove-ontology-comment-reponse.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(deleteOntoComment)));

            const path = "http://0.0.0.0:3333/v2/ontologies/comment/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Ffoo%2Fv2?lastModificationDate=2020-06-29T13%3A33%3A46.059576Z";

            expect(request.url).toBe(path);

            expect(request.method).toEqual("DELETE");

        });

    });

    describe("Method createResourceClass", () => {

        it("should create a new res class and add it to anything ontology", done => {

            const onto = new UpdateOntology<CreateResourceClass>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";
            onto.lastModificationDate = "2020-10-21T23:50:43.379793Z";

            const newResClass = new CreateResourceClass();

            newResClass.name = "Nothing";

            const comment = new StringLiteralV2();

            comment.language = "en";
            comment.value = "Represents nothing";

            newResClass.comment = [comment];

            const label = new StringLiteralV2();

            label.language = "en";
            label.value = "nothing";

            newResClass.label = [label];

            newResClass.subClassOf = ["http://api.knora.org/ontology/knora-api/v2#Resource"];

            onto.entity = newResClass;

            knoraApiConnection.v2.onto.createResourceClass(onto).subscribe(
                (response: ResourceClassDefinitionWithAllLanguages) => {
                    // console.log('new resource class created', response);
                    expect(response.id).toBe("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const createResClassResponse = require("../../../../test/data/api/v2/ontologies/create-class-without-cardinalities-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResClassResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/classes");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/create-class-without-cardinalities-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:43.379793Z";

            expect(request.data()).toEqual(expectedPayload);
        });

    });

    describe("Method updateResourceClass", () => {

        it("should update a resource class\'s label", done => {

            const onto = new UpdateOntology<UpdateResourceClassLabel>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:43.379793Z";

            const updateResClassLabel = new UpdateResourceClassLabel();

            updateResClassLabel.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            const label = new StringLiteralV2();

            label.language = "en";
            label.value = "nothing";

            const label2 = new StringLiteralV2();

            label2.language = "fr";
            label2.value = "rien";

            updateResClassLabel.labels = [label, label2];

            onto.entity = updateResClassLabel;

            knoraApiConnection.v2.onto.updateResourceClass(onto).subscribe(
                (res: ResourceClassDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const createResClassResponse = require("../../../../test/data/api/v2/ontologies/create-class-without-cardinalities-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResClassResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/classes");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/change-class-label-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:43.379793Z";

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should update a resource class\'s comment", done => {

            const onto = new UpdateOntology<UpdateResourceClassComment>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:43.379793Z";

            const updateResClassComment = new UpdateResourceClassComment();

            updateResClassComment.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            const label = new StringLiteralV2();

            label.language = "en";
            label.value = "Represents nothing";

            const label2 = new StringLiteralV2();

            label2.language = "fr";
            label2.value = "ne représente rien";

            updateResClassComment.comments = [label, label2];

            onto.entity = updateResClassComment;

            knoraApiConnection.v2.onto.updateResourceClass(onto).subscribe(
                (res: ResourceClassDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const createResClassResponse = require("../../../../test/data/api/v2/ontologies/create-class-without-cardinalities-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResClassResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/classes");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/change-class-comment-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:43.379793Z";

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("Method updateProperty", () => {

        it("should update a resource class\'s label", done => {

            const onto = new UpdateOntology<UpdateResourcePropertyLabel>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:43.379793Z";

            const updateResPropLabel = new UpdateResourcePropertyLabel();

            updateResPropLabel.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasName";

            const label = new StringLiteralV2();

            label.language = "en";
            label.value = "has name";

            const label2 = new StringLiteralV2();

            label2.language = "fr";
            label2.value = "a nom";

            const label3 = new StringLiteralV2();

            label3.language = "de";
            label3.value = "hat Namen";

            updateResPropLabel.labels = [label, label2, label3];

            onto.entity = updateResPropLabel;

            knoraApiConnection.v2.onto.updateResourceProperty(onto).subscribe(
                (res: ResourcePropertyDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#hasName");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const createResClassResponse = require("../../../../test/data/api/v2/ontologies/create-value-property-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResClassResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/properties");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/change-property-label-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:43.379793Z";

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should update a resource property\'s comment", done => {

            const onto = new UpdateOntology<UpdateResourcePropertyComment>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:43.379793Z";

            const updateResPropertyComment = new UpdateResourcePropertyComment();

            updateResPropertyComment.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasName";

            const label = new StringLiteralV2();

            label.language = "en";
            label.value = "The name of a Thing";

            const label2 = new StringLiteralV2();

            label2.language = "fr";
            label2.value = "Le nom d'une chose";

            const label3 = new StringLiteralV2();

            label3.language = "de";
            label3.value = "Der Name eines Dinges";

            updateResPropertyComment.comments = [label, label2, label3];

            onto.entity = updateResPropertyComment;

            knoraApiConnection.v2.onto.updateResourceProperty(onto).subscribe(
                (res: ResourcePropertyDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#hasName");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const createResClassResponse = require("../../../../test/data/api/v2/ontologies/create-value-property-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResClassResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/properties");

            expect(request.method).toEqual("PUT");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/change-property-comment-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:43.379793Z";

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("Method canDeleteResourceClass", () => {

        it("should check if a resource class can be deleted", done => {

            const resClassIri = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            knoraApiConnection.v2.onto.canDeleteResourceClass(resClassIri).subscribe(
                (res: CanDoResponse) => {
                    expect(res.canDo).toBeTrue();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const canDeleteResourceClassResponse = require("../../../../test/data/api/v2/ontologies/can-do-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(canDeleteResourceClassResponse)));

            expect(request.url).toEqual("http://0.0.0.0:3333/v2/ontologies/candeleteclass/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fanything%2Fv2%23Nothing");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method deleteResourceClass", () => {

        it("should delete a resource class", done => {

            const resclass = new DeleteResourceClass();

            resclass.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            resclass.lastModificationDate = "2017-12-19T15:23:42.166Z";

            knoraApiConnection.v2.onto.deleteResourceClass(resclass).subscribe(
                (res: OntologyMetadata) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const deleteResClassResponse = require("../../../../test/data/api/v2/ontologies/anything-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(deleteResClassResponse)));

            const path = "http://0.0.0.0:3333/v2/ontologies/classes/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fanything%2Fv2%23Nothing?lastModificationDate=2017-12-19T15%3A23%3A42.166Z";
            expect(request.url).toBe(path);

            expect(request.method).toEqual("DELETE");

        });

    });

    describe("Method createResourceProperty", () => {

        it("should create a new res property as supPropertyOf 'hasValue'", done => {

            const onto = new UpdateOntology<CreateResourceProperty>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";
            onto.lastModificationDate = "2017-12-19T15:23:42.166Z";

            const newResProp = new CreateResourceProperty();

            newResProp.name = "hasName";

            const label1 = new StringLiteralV2();

            label1.language = "en";
            label1.value = "has name";

            const label2 = new StringLiteralV2();

            label2.language = "de";
            label2.value = "hat Namen";

            newResProp.label = [
                label1,
                label2
            ];

            const comment1 = new StringLiteralV2();

            comment1.language = "en";
            comment1.value = "The name of a Thing";

            const comment2 = new StringLiteralV2();

            comment2.language = "de";
            comment2.value = "Der Name eines Dinges";

            newResProp.comment = [
                comment1,
                comment2
            ];

            newResProp.subPropertyOf = [
                Constants.HasValue,
                "http://schema.org/name"
            ];

            newResProp.objectType = Constants.TextValue;

            newResProp.subjectType = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

            newResProp.guiElement = "http://api.knora.org/ontology/salsah-gui/v2#SimpleText";

            newResProp.guiAttributes = ["size=80", "maxlength=100"];

            onto.entity = newResProp;

            knoraApiConnection.v2.onto.createResourceProperty(onto).subscribe(
                (response: ResourcePropertyDefinitionWithAllLanguages) => {
                    expect(response.id).toBe("http://0.0.0.0:3333/ontology/0001/anything/v2#hasName");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/create-value-property-request-expanded.json");
            expect(request.data()).toEqual(expectedPayload);

            const createResPropResponse = require("../../../../test/data/api/v2/ontologies/create-value-property-response.json");
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResPropResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/properties");

            expect(request.method).toEqual("POST");

        });

        it("should create a new res property as supPropertyOf 'hasLinkTo'", done => {

            const onto = new UpdateOntology<CreateResourceProperty>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";
            onto.lastModificationDate = "2020-10-21T23:50:45.204678Z";

            const newResProp = new CreateResourceProperty();

            newResProp.name = "hasOtherNothing";

            const label1 = new StringLiteralV2();

            label1.language = "en";
            label1.value = "has nothingness";

            newResProp.label = [
                label1
            ];

            const comment1 = new StringLiteralV2();

            comment1.language = "en";
            comment1.value = "Refers to the other Nothing of a Nothing";

            newResProp.comment = [
                comment1
            ];

            newResProp.subPropertyOf = [
                Constants.HasLinkTo
            ];

            newResProp.objectType = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            newResProp.subjectType = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            onto.entity = newResProp;

            knoraApiConnection.v2.onto.createResourceProperty(onto).subscribe(
                (response: ResourcePropertyDefinitionWithAllLanguages) => {
                    expect(response.id).toBe("http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherNothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/create-link-property-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:45.204678Z";

            expect(request.data()).toEqual(expectedPayload);

            const createResPropResponse = require("../../../../test/data/api/v2/ontologies/create-link-property-response.json");
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createResPropResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/properties");

            expect(request.method).toEqual("POST");

        });

    });

    describe("Method canDeleteResourceProperty", () => {

        it("should check if a property can be deleted", done => {

            const propertyIri = "http://0.0.0.0:3333/ontology/00FF/images/v2#titel";

            knoraApiConnection.v2.onto.canDeleteResourceProperty(propertyIri).subscribe(
                (res: CanDoResponse) => {
                    expect(res.canDo).toBeTrue();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const canDeleteResourcePropertyResponse = require("../../../../test/data/api/v2/ontologies/can-do-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(canDeleteResourcePropertyResponse)));

            expect(request.url).toEqual("http://0.0.0.0:3333/v2/ontologies/candeleteproperty/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F00FF%2Fimages%2Fv2%23titel");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method deleteResourceProperty", () => {

        it("should delete a resource property", done => {

            const resprop = new DeleteResourceProperty();

            resprop.id = "http://0.0.0.0:3333/ontology/00FF/images/v2#titel";

            resprop.lastModificationDate = "2017-12-19T15:23:42.166Z";

            knoraApiConnection.v2.onto.deleteResourceProperty(resprop).subscribe(
                (res: OntologyMetadata) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const deleteResourcePropertyResponse = require("../../../../test/data/api/v2/ontologies/anything-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(deleteResourcePropertyResponse)));

            const path = "http://0.0.0.0:3333/v2/ontologies/properties/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F00FF%2Fimages%2Fv2%23titel?lastModificationDate=2017-12-19T15%3A23%3A42.166Z";
            expect(request.url).toBe(path);

            expect(request.method).toEqual("DELETE");

        });

    });

    describe("Method addCardinalityToResourceClass", () => {

        it("should add a max cardinality 1 to a resource class", done => {

            const onto = new UpdateOntology<UpdateResourceClassCardinality>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:45.789081Z";

            const addCard = new UpdateResourceClassCardinality();

            addCard.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            addCard.cardinalities = [
                {
                    propertyIndex: "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherNothing",
                    cardinality: Cardinality._0_1
                }
            ];

            onto.entity = addCard;

            knoraApiConnection.v2.onto.addCardinalityToResourceClass(onto).subscribe(
                (res: ResourceClassDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/add-cardinalities-to-class-nothing-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:45.789081Z";

            expect(request.data()).toEqual(expectedPayload);

            const createCardResponse = require("../../../../test/data/api/v2/ontologies/add-cardinalities-to-class-nothing-response.json");
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createCardResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/cardinalities");

            expect(request.method).toEqual("POST");

        });

        it("should attempt to add cardinalities to a resource class without providing any", () => {

            const onto = new UpdateOntology<UpdateResourceClassCardinality>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:45.789081Z";

            const addCard = new UpdateResourceClassCardinality();

            addCard.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            addCard.cardinalities = [];

            onto.entity = addCard;

            expect(() =>
                knoraApiConnection.v2.onto.addCardinalityToResourceClass(onto)
            ).toThrow(new Error("At least one cardinality must be defined."));

        });

    });

    describe("Method canReplaceCardinalityOfResourceClass", () => {

        it("should check if cardinalities can be replaced", done => {

            const resClassIri = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            knoraApiConnection.v2.onto.canReplaceCardinalityOfResourceClass(resClassIri).subscribe(
                (res: CanDoResponse) => {
                    expect(res.canDo).toBeTrue();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const canReplaceCardinalityOfResourceClassResponse = require("../../../../test/data/api/v2/ontologies/can-do-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(canReplaceCardinalityOfResourceClassResponse)));

            expect(request.url).toEqual("http://0.0.0.0:3333/v2/ontologies/canreplacecardinalities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fanything%2Fv2%23Nothing");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method replaceCardinalityOfResourceClass", () => {

        it("should replace the cardinalities with a max cardinality 1 to a resource class", done => {

            const onto = new UpdateOntology<UpdateResourceClassCardinality>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:45.789081Z";

            const replaceCard = new UpdateResourceClassCardinality();

            replaceCard.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            replaceCard.cardinalities = [
                {
                    propertyIndex: "http://0.0.0.0:3333/ontology/0001/anything/v2#hasEmptiness",
                    cardinality: Cardinality._0_1,
                }
            ];

            onto.entity = replaceCard;

            knoraApiConnection.v2.onto.replaceCardinalityOfResourceClass(onto).subscribe(
                (res: ResourceClassDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/replace-class-cardinalities-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:45.789081Z";

            expect(request.data()).toEqual(expectedPayload);

            const createCardResponse = require("../../../../test/data/api/v2/ontologies/add-cardinalities-to-class-nothing-response.json");
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(createCardResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/cardinalities");

            expect(request.method).toEqual("PUT");

        });

        it("should remove all cardinalities when none are provided", done => {

            const onto = new UpdateOntology<UpdateResourceClassCardinality>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:45.789081Z";

            const removeCard = new UpdateResourceClassCardinality();

            removeCard.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            removeCard.cardinalities = [];

            onto.entity = removeCard;

            knoraApiConnection.v2.onto.replaceCardinalityOfResourceClass(onto).subscribe(
                (res: ResourceClassDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/remove-class-cardinalities-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:45.789081Z";

            expect(request.data()).toEqual(expectedPayload);

            const removeCardResponse = require("../../../../test/data/api/v2/ontologies/add-cardinalities-to-class-nothing-response.json");
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(removeCardResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/cardinalities");

            expect(request.method).toEqual("PUT");

        });

    });    
    
    describe("Method canDeleteCardinalitiesFromClass", () => {

        it("should check if cardinality can be deleted; response should be true", done => {

            const deleteCardinalitiesFromClassRequest = new UpdateOntology<UpdateResourceClassCardinality>();

            deleteCardinalitiesFromClassRequest.id = "http://0.0.0.0:3333/ontology/0001/freetest/v2";

            deleteCardinalitiesFromClassRequest.lastModificationDate = "2022-04-07T08:06:28.301682Z";

            const cardinalityToRemove = new UpdateResourceClassCardinality();

            cardinalityToRemove.id = "http://0.0.0.0:3333/ontology/0001/freetest/v2#BlueFreeTestClass";

            cardinalityToRemove.cardinalities = [
                {
                    propertyIndex: "http://0.0.0.0:3333/ontology/0001/freetest/v2#hasBlueTestTextProp",
                    cardinality: Cardinality._0_1
                }
            ];

            deleteCardinalitiesFromClassRequest.entity = cardinalityToRemove;

            knoraApiConnection.v2.onto.canDeleteCardinalityFromResourceClass(deleteCardinalitiesFromClassRequest).subscribe(
                (res: CanDoResponse) => {
                    expect(res.canDo).toBeTrue();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const canDeleteCardinalitiesFromClassResponse = require("../../../../test/data/api/v2/ontologies/can-do-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(canDeleteCardinalitiesFromClassResponse)));

            expect(request.url).toEqual("http://0.0.0.0:3333/v2/ontologies/candeletecardinalities");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/candeletecardinalities-true-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });
        
        it("should check if cardinality can be deleted; response should be false", done => {

            const deleteCardinalitiesFromClassRequest = new UpdateOntology<UpdateResourceClassCardinality>();

            deleteCardinalitiesFromClassRequest.id = "http://0.0.0.0:3333/ontology/0001/freetest/v2";

            deleteCardinalitiesFromClassRequest.lastModificationDate = "2022-04-07T08:06:28.301682Z";

            const cardinalityToRemove = new UpdateResourceClassCardinality();

            cardinalityToRemove.id = "http://0.0.0.0:3333/ontology/0001/freetest/v2#FreeTest";

            cardinalityToRemove.cardinalities = [
                {
                    propertyIndex: "http://0.0.0.0:3333/ontology/0001/freetest/v2#hasText",
                    cardinality: Cardinality._1_n
                }
            ];

            deleteCardinalitiesFromClassRequest.entity = cardinalityToRemove;

            knoraApiConnection.v2.onto.canDeleteCardinalityFromResourceClass(deleteCardinalitiesFromClassRequest).subscribe(
                (res: CanDoResponse) => {
                    expect(res.canDo).toBeFalse();
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const canDeleteCardinalitiesFromClassResponse = require("../../../../test/data/api/v2/ontologies/cannot-do-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(canDeleteCardinalitiesFromClassResponse)));

            expect(request.url).toEqual("http://0.0.0.0:3333/v2/ontologies/candeletecardinalities");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/candeletecardinalities-false-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

    });
    
    describe("Method updateGuiOrderOfCardinalities", () => {

        it("should replace the gui order", done => {

            const onto = new UpdateOntology<UpdateResourceClassCardinality>();

            onto.id = "http://0.0.0.0:3333/ontology/0001/anything/v2";

            onto.lastModificationDate = "2020-10-21T23:50:45.789081Z";

            const replaceCard = new UpdateResourceClassCardinality();

            replaceCard.id = "http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing";

            replaceCard.cardinalities = [
                {
                    propertyIndex: "http://0.0.0.0:3333/ontology/0001/anything/v2#hasNothingness",
                    cardinality: Cardinality._0_1,
                    guiOrder: 2
                }
            ];

            onto.entity = replaceCard;

            knoraApiConnection.v2.onto.replaceGuiOrderOfCardinalities(onto).subscribe(
                (res: ResourceClassDefinitionWithAllLanguages) => {
                    expect(res.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Nothing");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const expectedPayload = require("../../../../test/data/api/v2/ontologies/change-gui-order-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#lastModificationDate"]["@value"] = "2020-10-21T23:50:45.789081Z";

            expect(request.data()).toEqual(expectedPayload);

            // at the moment we do not have the correct (gui order) response, but it doesn't matter because we don't compare those data.
            const changeGuiOrderResponse = require("../../../../test/data/api/v2/ontologies/add-cardinalities-to-class-nothing-response.json");
            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(changeGuiOrderResponse)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/ontologies/guiorder");

            expect(request.method).toEqual("PUT");

        });

    });

});
