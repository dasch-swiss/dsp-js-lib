import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { OntologyCache } from "../../..";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ResourcesConversionUtil } from "./ResourcesConversionUtil";

describe("ResourcesConversionUtil", () => {

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
        jasmine.Ajax.install();

        getResourceClassDefinitionSpy = spyOn(ontoCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                const mock = MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri);
                return of(mock);
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method parseResourceSequence()", () => {

        it("parse JSON-LD representing a single resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/testding-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {

                    // console.log(resSeq[0].properties);

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

        it("parse JSON-LD representing a single page resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/page-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {

                    console.log(resSeq);

                    expect(resSeq.length).toEqual(1);

                    done();
                }
            );

        });

        it("parse JSON-LD representing a single region resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/region-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {

                    console.log(resSeq);

                    expect(resSeq.length).toEqual(1);

                    done();
                }
            );

        });

        it("parse JSON-LD representing an empty resource", done => {

            const emptyResource = {};

            ResourcesConversionUtil.createReadResourceSequence(emptyResource, ontoCache, jsonConvert).subscribe(
                resSeq => {
                    expect(resSeq.length).toEqual(0);
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

        });

        it("parse JSON-LD representing several resources", done => {

            const resource = require("../../../../test/data/api/v2/resources/things-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {
                    expect(resSeq.length).toEqual(16);

                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledTimes(16);
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2#BlueThing");
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2#ThingPicture");
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledWith("http://api.knora.org/ontology/knora-api/v2#ForbiddenResource");

                    done();
                }
            );

        });

    });

});
