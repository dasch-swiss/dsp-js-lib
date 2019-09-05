import { KnoraApiConfig } from "../../../knora-api-config";
import { OntologyConversionUtil } from "./OntologyConversionUtil";

describe("OntologyConversionUtil", () => {

    describe("Method getOntologyIriFromEntityIri", () => {

        const config = new KnoraApiConfig("http", "api.dasch.swiss");

        it("should get the ontology IRI from a knora-api entity", () => {
            const ontologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri("http://api.knora.org/ontology/knora-api/v2#Resource", config);

            expect(ontologyIri[0]).toEqual("http://api.knora.org/ontology/knora-api/v2");

        });

        it("should get the ontology IRI from a project entity", () => {
            const ontologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri("http://api.dasch.swiss/ontology/0807/mls/v2#Article", config);

            expect(ontologyIri[0]).toEqual("http://api.dasch.swiss/ontology/0807/mls/v2");

        });

        it("should ignore an external entity", () => {
            const ontologyIri = OntologyConversionUtil.getOntologyIriFromEntityIri("http://www.w3.org/2000/01/rdf-schema#label", config);

            expect(ontologyIri.length).toEqual(0);

        });

    });

});