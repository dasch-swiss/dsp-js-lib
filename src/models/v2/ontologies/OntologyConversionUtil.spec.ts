import { KnoraApiConfig } from "../../../knora-api-config";
import { OntologyConversionUtil } from "./OntologyConversionUtil";

describe("OntologyConversionUtil", () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getOntologyIriFromEntityIri", () => {
        const localConfig = new KnoraApiConfig("http", "0.0.0.0", 3333);
        const remoteConfig = new KnoraApiConfig("https", "test.example.com", 3333);

        it("should get the ontology IRI from a knora-api entity", () => {
            const localOntologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri(
                "http://api.knora.org/ontology/knora-api/v2#Resource",
                localConfig
            );

            expect(localOntologyIri[0]).toEqual(
                "http://api.knora.org/ontology/knora-api/v2"
            );

            const remoteOntologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri(
                "http://api.knora.org/ontology/knora-api/v2#Resource",
                remoteConfig
            );

            expect(remoteOntologyIri[0]).toEqual(
              "http://api.knora.org/ontology/knora-api/v2"
            );
        });

        it("should get the ontology IRI from a project entity", () => {
            const localOntologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri(
                "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                localConfig
            );

            expect(localOntologyIri[0]).toEqual(
                "http://0.0.0.0:3333/ontology/0001/anything/v2"
            );

            const remoteOntologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri(
                "http://test.example.com/ontology/0001/anything/v2#Thing",
                remoteConfig
            );

            expect(remoteOntologyIri[0]).toEqual(
                "http://test.example.com/ontology/0001/anything/v2"
            );
        });

        it("should ignore an external entity", () => {
            const localOntologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri(
                "http://www.w3.org/2000/01/rdf-schema#label",
                localConfig
            );

            expect(localOntologyIri.length).toEqual(0);

            const remoteOntologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri(
                "http://www.w3.org/2000/01/rdf-schema#label",
                remoteConfig
            );

            expect(remoteOntologyIri.length).toEqual(0);
        });

    });

});
