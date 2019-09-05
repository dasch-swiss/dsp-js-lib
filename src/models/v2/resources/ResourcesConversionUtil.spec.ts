import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { OntologyCache } from "../../..";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ResourcesConversionUtil } from "./ResourcesConversionUtil";

describe("OntologyConversionUtil", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, undefined, "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    const ontoCache = new OntologyCache(knoraApiConnection, config);

    let getResourceClassDefinitionSpy: jasmine.Spy;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    beforeEach(() => {

        getResourceClassDefinitionSpy = spyOn(ontoCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri));
            }
        );
    });

    describe("Method parseResourceSequence()", () => {

        it("parse JSON-LD representing a single resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/testding-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {
                    expect(resSeq.length).toEqual(1);

                    expect(resSeq[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw");
                    expect(resSeq[0].type).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");
                    expect(resSeq[0].resourceClassLabel).toEqual("Thing");

                    expect(resSeq[0].properties.length).toEqual(12);

                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledTimes(2);
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");

                    done();
                }
            );

        });

    });

});
