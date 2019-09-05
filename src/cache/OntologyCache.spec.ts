import { of } from "rxjs";
import { OntologyCache } from "..";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ReadOntology } from "../models/v2/ontologies/read-ontology";

describe("OntologyCache", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe("Method getItem", () => {

        let getOntoSpy: jasmine.Spy;
        let ontoCache: OntologyCache;

        beforeEach(() => {

            getOntoSpy = spyOn(knoraApiConnection.v2.onto, "getOntology").and.callFake(
                (ontoIri: string) => {

                    const ontoResp = new ReadOntology();
                    ontoResp.id = ontoIri;
                    ontoResp.dependsOnOntologies = new Set(["http://api.knora.org/ontology/knora-api/v2"]);

                    return of(ontoResp);
                }
            );

            ontoCache = new OntologyCache(knoraApiConnection);

        });

        it("should get an ontology from the cache", done => {

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

    });

});
