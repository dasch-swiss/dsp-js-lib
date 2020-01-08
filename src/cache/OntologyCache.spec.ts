import { of } from "rxjs";
import { MockOntology } from "../../test/data/api/v2/mockOntology";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ReadOntology } from "../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../models/v2/ontologies/resource-class-definition";

describe("OntologyCache", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, "", "", true);
    let knoraApiConnection: KnoraApiConnection;

    let getOntoSpy: jasmine.Spy;

    beforeEach(() => {

        jasmine.Ajax.install();

        knoraApiConnection = new KnoraApiConnection(config);

        getOntoSpy = spyOn(knoraApiConnection.v2.onto, "getOntology").and.callFake(
            (ontoIri: string) => {

                const onto = MockOntology.mockReadOntology(ontoIri);

                return of(onto);
            }
        );

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem()", () => {

        it("should get an ontology with dependencies from the cache", done => {

            knoraApiConnection.v2.ontologyCache["getItem"]("http://0.0.0.0:3333/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://0.0.0.0:3333/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });
        });

        it("should get an ontology with dependencies from the cache several times asynchronously", done => {

            knoraApiConnection.v2.ontologyCache["getItem"]("http://0.0.0.0:3333/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://0.0.0.0:3333/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });

            knoraApiConnection.v2.ontologyCache["getItem"]("http://0.0.0.0:3333/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://0.0.0.0:3333/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });

            knoraApiConnection.v2.ontologyCache["getItem"]("http://0.0.0.0:3333/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://0.0.0.0:3333/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });
        });

        it("should get an ontology without dependencies from the cache", done => {

            knoraApiConnection.v2.ontologyCache["getItem"]("http://api.knora.org/ontology/knora-api/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://api.knora.org/ontology/knora-api/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(1);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2");

                expect(knoraApiConnection.v2.ontologyCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined();
                done();

            });
        });

    });

    describe("Method getOntology()", () => {

        it("should get an ontology with direct dependencies from the cache", done => {

            knoraApiConnection.v2.ontologyCache.getOntology("http://0.0.0.0:3333/ontology/0001/anything/v2").subscribe(ontos => {

                expect(ontos.size).toEqual(2);
                expect(ontos.has("http://0.0.0.0:3333/ontology/0001/anything/v2")).toBeTruthy();
                expect(ontos.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                expect(ontos.get("http://0.0.0.0:3333/ontology/0001/anything/v2") instanceof ReadOntology).toBeTruthy();
                expect(ontos.get("http://api.knora.org/ontology/knora-api/v2") instanceof ReadOntology).toBeTruthy();

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                done();

            });

        });

        it("should get an ontology without dependencies from the cache", done => {

            knoraApiConnection.v2.ontologyCache.getOntology("http://api.knora.org/ontology/knora-api/v2").subscribe(ontos => {

                expect(ontos.size).toEqual(1);
                expect(ontos.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                expect(ontos.get("http://api.knora.org/ontology/knora-api/v2") instanceof ReadOntology).toBeTruthy();

                expect(getOntoSpy).toHaveBeenCalledTimes(1);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2");

                done();

            });

        });

    });

    describe("Method getResourceClass()", () => {

        it("should get the definition of a resource class and its properties", done => {

            knoraApiConnection.v2.ontologyCache.getResourceClassDefinition("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing").subscribe(
                resClassDef => {

                    expect(resClassDef.classes["http://0.0.0.0:3333/ontology/0001/anything/v2#Thing"] instanceof ResourceClassDefinition).toBeTruthy();
                    expect(Object.keys(resClassDef.properties).length).toEqual(37);

                    done();

                }
            );

        });

    });

});
