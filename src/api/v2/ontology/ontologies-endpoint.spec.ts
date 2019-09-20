import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ReadOntology } from "../../../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../../../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../models/v2/ontologies/resource-property-definition";
import { SystemPropertyDefinition } from "../../../models/v2/ontologies/system-property-definition";
import { OntologyCompactor } from "../helper/ontology-compactor";

describe("OntologiesEndpoint", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getOntology", () => {

        it("should return an ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://api.knora.org/ontology/knora-api/v2").subscribe(
                (response: ReadOntology) => {

                    expect(response.id).toEqual("http://api.knora.org/ontology/knora-api/v2");

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

            expect(request.url).toBe("http://api.dasch.swiss/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2");

            expect(request.method).toEqual("GET");

        });

        it("should return a project ontology", done => {
            const compactor = OntologyCompactor.getOntologyCompactor();
            compactor.addPrefix("any", "http://api.dasch.swiss/ontology/0001/anything/v2#");
            knoraApiConnection.v2.onto.getOntology("http://api.dasch.swiss/ontology/0001/anything/v2").subscribe(
                (response: ReadOntology) => {
                    console.log(JSON.stringify(response, null, 2));
                    expect(response.id).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2");

                    expect(response.dependsOnOntologies.size).toEqual(1);
                    expect(response.dependsOnOntologies.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                    expect(response.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"] instanceof ResourceClassDefinition);
                    expect(response.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"].id).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");
                    expect(response.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"].label).toEqual("Thing");
                    expect(response.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"].comment).toEqual("'The whole world is full of things, which means there's a real need for someone to go searching for them. And that's exactly what a thing-searcher does.' --Pippi Longstocking");

                    expect(response.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"].propertiesList.length).toEqual(36);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require("../../../../test/data/api/v2/ontologies/anything-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe("http://api.dasch.swiss/v2/ontologies/allentities/http%3A%2F%2Fapi.dasch.swiss%2Fontology%2F0001%2Fanything%2Fv2");

            expect(request.method).toEqual("GET");

        });

        it("should return a very simple project ontology", done => {

            knoraApiConnection.v2.onto.getOntology("http://api.dasch.swiss/ontology/0001/minimal/v2").subscribe(
                (response: ReadOntology) => {

                    expect(response.id).toEqual("http://api.dasch.swiss/ontology/0001/minimal/v2");

                    expect(response.dependsOnOntologies.size).toEqual(1);
                    expect(response.dependsOnOntologies.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const onto = require("../../../../test/data/api/v2/ontologies/minimal-ontology.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

            expect(request.url).toBe("http://api.dasch.swiss/v2/ontologies/allentities/http%3A%2F%2Fapi.dasch.swiss%2Fontology%2F0001%2Fminimal%2Fv2");

            expect(request.method).toEqual("GET");

        });

    });

});
