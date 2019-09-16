import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { OntologyCache } from "../../..";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ResourcesConversionUtil } from "./ResourcesConversionUtil";
import { ReadUriValue } from "./values/read-uri-value";

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

                    expect(resSeq.length).toEqual(1);

                    expect(resSeq[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw");
                    expect(resSeq[0].type).toEqual("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");
                    expect(resSeq[0].label).toEqual("testding");

                    expect(resSeq[0].attachedToProject).toEqual("http://rdfh.ch/projects/0001");
                    expect(resSeq[0].attachedToUser).toEqual("http://rdfh.ch/users/BhkfBc3hTeS_IDo-JgXRbQ");
                    expect(resSeq[0].hasPermissions).toEqual("CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:KnownUser|RV knora-admin:UnknownUser");
                    expect(resSeq[0].userHasPermission).toEqual("RV");
                    expect(resSeq[0].arkUrl).toEqual("http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk");
                    expect(resSeq[0].versionArkUrl).toEqual("http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk.20180528T155203897Z");
                    expect(resSeq[0].creationDate).toEqual("2018-05-28T15:52:03.897Z");
                    expect(resSeq[0].lastModificationDateDate).toBeUndefined();

                    expect(resSeq[0].resourceClassLabel).toEqual("Thing");
                    expect(resSeq[0].resourceClassComment).toEqual("'The whole world is full of things, which means there's a real need for someone to go searching for them. And that's exactly what a thing-searcher does.' --Pippi Longstocking");

                    expect(resSeq[0].getNumberOfProperties()).toEqual(12);
                    expect(resSeq[0].getNumberOfValues("http://api.dasch.swiss/ontology/0001/anything/v2#hasUri")).toEqual(1);

                    const uriVals = resSeq[0].getValues("http://api.dasch.swiss/ontology/0001/anything/v2#hasUri");

                    expect(uriVals.length).toEqual(1);

                    expect(uriVals[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/uBAmWuRhR-eo1u1eP7qqNg");
                    expect(uriVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#UriValue");
                    expect(uriVals[0].attachedToUser).toEqual("http://rdfh.ch/users/BhkfBc3hTeS_IDo-JgXRbQ");
                    expect(uriVals[0].arkUrl).toEqual("http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk/uBAmWuRhR=eo1u1eP7qqNgs");
                    expect(uriVals[0].versionArkUrl).toEqual("http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk/uBAmWuRhR=eo1u1eP7qqNgs.20180528T155203897Z");
                    expect(uriVals[0].hasPermissions).toEqual("CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:KnownUser|RV knora-admin:UnknownUser");
                    expect(uriVals[0].userHasPermission).toEqual("RV");
                    expect(uriVals[0].valueCreationDate).toEqual("2018-05-28T15:52:03.897Z");
                    expect(uriVals[0].userHasPermission).toEqual("RV");
                    expect(uriVals[0].uuid).toEqual("uBAmWuRhR-eo1u1eP7qqNg");

                    expect(uriVals[0] instanceof ReadUriValue).toBeTruthy();
                    expect((uriVals[0] as ReadUriValue).uri).toEqual("http://www.google.ch");

                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledTimes(2);
                    expect(getResourceClassDefinitionSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");

                    expect(resSeq[0].outgoingReferences.length).toEqual(1);
                    expect(resSeq[0].outgoingReferences[0].id).toEqual("http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ");


                    done();
                }
            );

        });

        it("parse JSON-LD representing a single page resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/page-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {

                    // console.log(resSeq[0].properties);

                    expect(resSeq.length).toEqual(1);

                    done();
                }
            );

        });

        it("parse JSON-LD representing a single region resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/region-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, ontoCache, jsonConvert).subscribe(
                resSeq => {

                    // console.log(resSeq[0].properties);

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
