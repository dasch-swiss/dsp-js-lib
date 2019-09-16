import { of } from "rxjs";
import { OntologyCache } from "..";
import { MockOntology } from "../../test/data/api/v2/mockOntology";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ReadOntology } from "../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../models/v2/ontologies/resource-class-definition";

describe("OntologyCache", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, "", "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    let getOntoSpy: jasmine.Spy;
    let ontoCache: OntologyCache;

    beforeEach(() => {

        jasmine.Ajax.install();

        getOntoSpy = spyOn(knoraApiConnection.v2.onto, "getOntology").and.callFake(
            (ontoIri: string) => {

                const onto = MockOntology.mockReadOntology(ontoIri);

                return of(onto);
            }
        );

        ontoCache = new OntologyCache(knoraApiConnection, config);

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getItem()", () => {

        it("should get an ontology with dependencies from the cache", done => {

            ontoCache["getItem"]("http://api.dasch.swiss/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(ontoCache["cache"]["http://api.dasch.swiss/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(ontoCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });
        });

        it("should get an ontology with dependencies from the cache several times asynchronously", done => {

            ontoCache["getItem"]("http://api.dasch.swiss/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(ontoCache["cache"]["http://api.dasch.swiss/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(ontoCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });

            ontoCache["getItem"]("http://api.dasch.swiss/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(ontoCache["cache"]["http://api.dasch.swiss/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(ontoCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });

            ontoCache["getItem"]("http://api.dasch.swiss/ontology/0001/anything/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                expect(ontoCache["cache"]["http://api.dasch.swiss/ontology/0001/anything/v2"]).not.toBeUndefined();
                expect(ontoCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined(); // anything onto depends on knora-api
                done();

            });
        });

        it("should get an ontology without dependencies from the cache", done => {

            ontoCache["getItem"]("http://api.knora.org/ontology/knora-api/v2").subscribe((onto: ReadOntology) => {

                expect(onto.id).toEqual("http://api.knora.org/ontology/knora-api/v2");

                expect(getOntoSpy).toHaveBeenCalledTimes(1);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2");

                expect(ontoCache["cache"]["http://api.knora.org/ontology/knora-api/v2"]).not.toBeUndefined();
                done();

            });
        });

    });

    describe("Method getOntology()", () => {

        it("should get an ontology with direct dependencies from the cache", done => {

            ontoCache.getOntology("http://api.dasch.swiss/ontology/0001/anything/v2").subscribe(ontos => {

                expect(ontos.size).toEqual(2);
                expect(ontos.has("http://api.dasch.swiss/ontology/0001/anything/v2")).toBeTruthy();
                expect(ontos.has("http://api.knora.org/ontology/knora-api/v2")).toBeTruthy();

                expect(ontos.get("http://api.dasch.swiss/ontology/0001/anything/v2") instanceof ReadOntology).toBeTruthy();
                expect(ontos.get("http://api.knora.org/ontology/knora-api/v2") instanceof ReadOntology).toBeTruthy();

                expect(getOntoSpy).toHaveBeenCalledTimes(2);
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2");
                expect(getOntoSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2"); // anything onto depends on knora-api

                done();

            });

        });

        it("should get an ontology without dependencies from the cache", done => {

            ontoCache.getOntology("http://api.knora.org/ontology/knora-api/v2").subscribe(ontos => {

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

            ontoCache.getResourceClassDefinition("http://api.dasch.swiss/ontology/0001/anything/v2#Thing").subscribe(
                resClassDef => {

                    expect(resClassDef.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"] instanceof ResourceClassDefinition).toBeTruthy();
                    expect(Object.keys(resClassDef.properties).length).toEqual(35);

                    done();

                    /*resClassDef.classes["http://api.dasch.swiss/ontology/0001/anything/v2#Thing"].propertiesList.forEach(prop => console.log(prop.propertyIndex));
                    console.log("+++++")
                    const propKeys = Object.keys(resClassDef.properties);
                    propKeys.forEach(key => {
                        console.log(resClassDef.properties[key].id);
                        console.log(resClassDef.properties[key]);
                    });*/

                }
            );

        });

    });

});
