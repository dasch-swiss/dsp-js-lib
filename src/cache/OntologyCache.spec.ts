import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { OntologyCache } from "..";
import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ReadOntology } from "../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../models/v2/ontologies/resource-property-definition";
import { StandoffClassDefinition } from "../models/v2/ontologies/standoff-class-definition";
import { SystemPropertyDefinition } from "../models/v2/ontologies/system-property-definition";
import { OntologyConversionUtils } from "../models/v2/OntologyConversionUtil";

describe("OntologyCache", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", 3333, "", "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe("Method getItem", () => {

        let getOntoSpy: jasmine.Spy;
        let ontoCache: OntologyCache;

        beforeEach(() => {

            getOntoSpy = spyOn(knoraApiConnection.v2.onto, "getOntology").and.callFake(
                (ontoIri: string) => {

                    const onto = mockOntology(ontoIri);

                    return of(onto);
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

const mockOntology = (ontoIri: string): ReadOntology => {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    let ontologyJsonld;

    if (ontoIri === "http://api.knora.org/ontology/knora-api/v2") {
        ontologyJsonld = require("../../test/data/api/v2/ontologies/knora-api-ontology-expanded.json");
    } else if (ontoIri === "http://api.dasch.swiss/ontology/0001/anything/v2") {
        ontologyJsonld = require("../../test/data/api/v2/ontologies/anything-ontology-expanded.json");
    } else {
        throw new Error("Ontology not supported: " + ontoIri);
    }

    const onto = jsonConvert.deserializeObject(ontologyJsonld, ReadOntology);

    const entities: object[] = (ontologyJsonld as { [index: string]: object[] })["@graph"];

    // Convert resource classes
    entities.filter(OntologyConversionUtils.filterResourceClassDefinitions).map(resclassJsonld => {
        return OntologyConversionUtils.convertEntity(resclassJsonld, ResourceClassDefinition, jsonConvert);
    }).forEach((resClass: ResourceClassDefinition) => {
        onto.classes[resClass.id] = resClass;
    });

    // Convert standoff classes
    entities.filter(OntologyConversionUtils.filterStandoffClassDefinitions).map(standoffclassJsonld => {
        return OntologyConversionUtils.convertEntity(standoffclassJsonld, StandoffClassDefinition, jsonConvert);
    }).forEach((standoffClass: StandoffClassDefinition) => {
        onto.classes[standoffClass.id] = standoffClass;
    });

    // Convert resource properties (properties pointing to Knora values)
    entities.filter(OntologyConversionUtils.filterResourcePropertyDefinitions).map(propertyJsonld => {
        return OntologyConversionUtils.convertEntity(propertyJsonld, ResourcePropertyDefinition, jsonConvert);
    }).forEach((prop: ResourcePropertyDefinition) => {
        onto.properties[prop.id] = prop;
    });

    // Convert system properties (properties not pointing to Knora values)
    entities.filter(OntologyConversionUtils.filterSystemPropertyDefintions).map(propertyJsonld => {
        return OntologyConversionUtils.convertEntity(propertyJsonld, SystemPropertyDefinition, jsonConvert);
    }).forEach((prop: SystemPropertyDefinition) => {
        onto.properties[prop.id] = prop;
    });

    const referencedOntologies: Set<string> = new Set([]);

    if (ontoIri === "http://api.dasch.swiss/ontology/0001/anything/v2") {
        referencedOntologies.add("http://api.knora.org/ontology/knora-api/v2")
    }

    onto.dependsOnOntologies = referencedOntologies;

    return onto;

};
