import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import {
    ReadBooleanValue,
    ReadColorValue,
    ReadDecimalValue,
    ReadGeomValue,
    ReadIntervalValue,
    ReadIntValue,
    ReadLinkValue,
    ReadResource,
    ReadTextValueAsString,
    ReadTextValueAsXml
} from "../../..";
import { MockList } from "../../../../test/data/api/v2/mockList";
import { MockOntology } from "../../../../test/data/api/v2/mockOntology";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ResourcesConversionUtil } from "./ResourcesConversionUtil";
import { KnoraDate, Precision, ReadDateValue } from "./values/read-date-value";
import { Point2D, RegionGeometry } from "./values/read-geom-value";
import { ReadListValue } from "./values/read-list-value";
import { ReadUriValue } from "./values/read-uri-value";

describe("ResourcesConversionUtil", () => {

    const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, "", true);
    let knoraApiConnection: KnoraApiConnection;

    let getResourceClassDefinitionFromCacheSpy: jasmine.Spy;
    let getListNodeFromCacheSpy: jasmine.Spy;

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    beforeEach(() => {
        jasmine.Ajax.install();

        knoraApiConnection = new KnoraApiConnection(config);

        getResourceClassDefinitionFromCacheSpy = spyOn(knoraApiConnection.v2.ontologyCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                const mock = MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri);
                return of(mock);
            }
        );

        getListNodeFromCacheSpy = spyOn(knoraApiConnection.v2.listNodeCache, "getNode").and.callFake(
            (listNodeIri: string) => {
                return MockList.mockCompletedAsyncSubject(listNodeIri);
            }
        );

    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method parseResourceSequence()", () => {

        it("parse JSON-LD representing a single resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/testding-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, knoraApiConnection.v2.ontologyCache, knoraApiConnection.v2.listNodeCache, jsonConvert).subscribe(
                resSeq => {

                    expect(resSeq.length).toEqual(1);

                    expect(resSeq[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw");
                    expect(resSeq[0].type).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");
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
                    expect(resSeq[0].getNumberOfValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri")).toEqual(1);

                    //
                    // test boolean value
                    //
                    const boolVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean");
                    expect(boolVals.length).toEqual(1);
                    expect(boolVals[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/IN4R19yYR0ygi3K2VEHpUQ");
                    expect(boolVals[0].attachedToUser).toEqual("http://rdfh.ch/users/BhkfBc3hTeS_IDo-JgXRbQ");
                    expect(boolVals[0].arkUrl).toEqual("http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk/IN4R19yYR0ygi3K2VEHpUQe");
                    expect(boolVals[0].versionArkUrl).toEqual("http://0.0.0.0:3336/ark:/72163/1/0001/H6gBWUuJSuuO=CilHV8kQwk/IN4R19yYR0ygi3K2VEHpUQe.20180528T155203897Z");
                    expect(boolVals[0].hasPermissions).toEqual("CR knora-admin:Creator|M knora-admin:ProjectMember|V knora-admin:KnownUser|RV knora-admin:UnknownUser");
                    expect(boolVals[0].userHasPermission).toEqual("RV");
                    expect(boolVals[0].valueCreationDate).toEqual("2018-05-28T15:52:03.897Z");
                    expect(boolVals[0].userHasPermission).toEqual("RV");
                    expect(boolVals[0].uuid).toEqual("IN4R19yYR0ygi3K2VEHpUQ");
                    expect(boolVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#BooleanValue");
                    expect(boolVals[0].strval).toEqual("TRUE");
                    const boolValsTyped: ReadBooleanValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean", ReadBooleanValue);
                    expect(boolValsTyped[0].bool).toBeTruthy();

                    //
                    // test color value
                    //
                    const colorVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor");
                    expect(colorVals.length).toEqual(1);
                    expect(colorVals[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/TAziKNP8QxuyhC4Qf9-b6w");
                    expect(colorVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#ColorValue");
                    expect(colorVals[0].strval).toEqual("#ff3333");
                    const colorValsTyped: ReadColorValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor", ReadColorValue);
                    expect(colorValsTyped[0].color).toEqual("#ff3333");

                    //
                    // test decimal value
                    //
                    const decimalVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal");
                    expect(decimalVals.length).toEqual(1);
                    expect(decimalVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#DecimalValue");
                    expect(decimalVals[0].strval).toEqual("1.5");
                    const decimalValsTyped: ReadDecimalValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal", ReadDecimalValue);
                    expect(decimalValsTyped[0].decimal).toBeGreaterThanOrEqual(1.5);
                    expect(decimalValsTyped[0].decimal).toBeLessThanOrEqual(1.5);

                    //
                    // test integer value
                    //
                    const integerVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger");
                    expect(integerVals.length).toEqual(1);
                    expect(integerVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#IntValue");
                    expect(integerVals[0].strval).toEqual("1");
                    const integerValsTyped: ReadIntValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger", ReadIntValue);
                    expect(integerValsTyped[0].int).toEqual(1);

                    //
                    // test interval value
                    //
                    const intervalVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval");
                    expect(intervalVals.length).toEqual(1);
                    expect(intervalVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#IntervalValue");
                    expect(intervalVals[0].strval).toEqual("0 - 216000");
                    const intervalValsTyped: ReadIntervalValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval", ReadIntervalValue);
                    expect(intervalValsTyped[0].start).toBeGreaterThanOrEqual(0);
                    expect(intervalValsTyped[0].start).toBeLessThanOrEqual(0);
                    expect(intervalValsTyped[0].end).toBeGreaterThanOrEqual(216000);
                    expect(intervalValsTyped[0].end).toBeLessThanOrEqual(216000);

                    //
                    // test link value
                    //
                    const linkVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue");
                    expect(linkVals.length).toEqual(1);
                    expect(linkVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#LinkValue");
                    expect(linkVals[0].strval).toEqual("http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ");
                    const linkValsTyped: ReadLinkValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue", ReadLinkValue);
                    expect(linkValsTyped[0].linkedResourceIri).toEqual("http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ");
                    expect(linkValsTyped[0].linkedResource).toBeDefined();
                    expect(linkValsTyped[0].linkedResource instanceof ReadResource).toBeTruthy();
                    if (linkValsTyped[0].linkedResource) {
                        const linkedTarget: ReadResource = linkValsTyped[0].linkedResource;
                        expect(linkedTarget.id).toEqual("http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ");
                        expect(linkedTarget.type).toEqual("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");
                        expect(linkedTarget.label).toEqual("Sierra");
                    }

                    //
                    // test richtext value
                    //
                    const rtextVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext");
                    expect(rtextVals.length).toEqual(1);
                    expect(rtextVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#TextValue");
                    expect(rtextVals[0].strval).toEqual("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text><p>test with <strong>markup</strong></p></text>");
                    expect(rtextVals[0] instanceof ReadTextValueAsXml).toBeTruthy();
                    if (rtextVals[0] instanceof ReadTextValueAsXml) {
                        const rtextValsTyped: ReadTextValueAsXml[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext", ReadTextValueAsXml);
                        expect(rtextValsTyped[0].xml).toEqual("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text><p>test with <strong>markup</strong></p></text>");
                        expect(rtextValsTyped[0].mapping).toEqual("http://rdfh.ch/standoff/mappings/StandardMapping");
                    }

                    //
                    // test text value
                    //
                    const textVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasText");
                    expect(textVals.length).toEqual(1);
                    expect(textVals[0].type).toEqual("http://api.knora.org/ontology/knora-api/v2#TextValue");
                    expect(textVals[0].strval).toEqual("test");
                    expect(textVals[0] instanceof ReadTextValueAsString).toBeTruthy();
                    if (textVals[0] instanceof ReadTextValueAsString) {
                        const textValsTyped: ReadTextValueAsString[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasText", ReadTextValueAsString);
                        expect(textValsTyped[0].text).toEqual("test");
                    }

                    //
                    // test uri value
                    //
                    const uriVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri");

                    expect(uriVals.length).toEqual(1);

                    expect(uriVals[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/uBAmWuRhR-eo1u1eP7qqNg");
                    expect(uriVals[0].strval).toEqual("http://www.google.ch");
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

                    const uriValsTyped: ReadUriValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri", ReadUriValue);
                    expect(uriValsTyped[0].uri).toEqual("http://www.google.ch");

                    expect(resSeq[0].getValueType("http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri")).toEqual("http://api.knora.org/ontology/knora-api/v2#UriValue");

                    // test list value
                    const listVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem");

                    expect(listVals[0].strval).toEqual("Tree list node 01");
                    expect(listVals[0] instanceof ReadListValue);
                    expect((listVals[0] as ReadListValue).listNode).toEqual("http://rdfh.ch/lists/0001/treeList01");
                    expect((listVals[0] as ReadListValue).listNodeLabel).toEqual("Tree list node 01");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(2);
                    expect(getListNodeFromCacheSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");
                    expect(getListNodeFromCacheSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/otherTreeList01");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(2);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(resSeq[0].outgoingReferences.length).toEqual(1);
                    expect(resSeq[0].outgoingReferences[0].id).toEqual("http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ");

                    //
                    // test date value
                    //
                    const dateVals = resSeq[0].getValues("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate");
                    expect(dateVals.length).toEqual(1);
                    expect(dateVals[0].id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/-rG4F5FTTu2iB5mTBPVn5Q");
                    expect(dateVals[0].strval).toEqual("GREGORIAN:2018-05-13 CE");
                    expect(dateVals[0] instanceof ReadDateValue).toBeTruthy();
                    const dateValsTyped: ReadDateValue[] = resSeq[0].getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate", ReadDateValue);
                    expect(dateValsTyped[0].date instanceof KnoraDate).toBeTruthy();
                    const dateValsDate = dateValsTyped[0].date as KnoraDate;
                    expect(dateValsDate.calendar).toEqual("GREGORIAN");
                    expect(dateValsDate.precision).toEqual(Precision.dayPrecision);
                    expect(dateValsDate.era).toEqual("CE");
                    expect(dateValsDate.year).toEqual(2018);
                    expect(dateValsDate.month).toEqual(5);
                    expect(dateValsDate.day).toEqual(13);

                    done();
                }
            );

        });

        it("parse JSON-LD representing a single page resource", done => {

            const resource = require("../../../../test/data/api/v2/resources/page-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, knoraApiConnection.v2.ontologyCache, knoraApiConnection.v2.listNodeCache, jsonConvert).subscribe(
                resSeq => {

                    // console.log(resSeq[0].properties);

                    expect(resSeq.length).toEqual(1);

                    done();
                }
            );

        });

        it("parse JSON-LD representing two region resources", done => {

            const resource = require("../../../../test/data/api/v2/resources/regions-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, knoraApiConnection.v2.ontologyCache, knoraApiConnection.v2.listNodeCache, jsonConvert).subscribe(
                resSeq => {

                    expect(resSeq.length).toEqual(2);

                    const geomVal: ReadGeomValue[] = resSeq[0].getValuesAs("http://api.knora.org/ontology/knora-api/v2#hasGeometry", ReadGeomValue);

                    const regGeom = new RegionGeometry("active", "#ff3333", 2, [new Point2D(0.08098591549295775, 0.16741071428571427), new Point2D(0.7394366197183099, 0.7299107142857143)], "rectangle");

                    expect(geomVal[0].geometry).toEqual(regGeom);

                    done();
                }
            );

        });

        it("parse JSON-LD representing an empty resource", done => {

            const emptyResource = {};

            ResourcesConversionUtil.createReadResourceSequence(emptyResource, knoraApiConnection.v2.ontologyCache, knoraApiConnection.v2.listNodeCache, jsonConvert).subscribe(
                resSeq => {
                    expect(resSeq.length).toEqual(0);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

        });

        it("parse JSON-LD representing several resources", done => {

            const resource = require("../../../../test/data/api/v2/resources/things-expanded.json");

            ResourcesConversionUtil.createReadResourceSequence(resource, knoraApiConnection.v2.ontologyCache, knoraApiConnection.v2.listNodeCache, jsonConvert).subscribe(
                resSeq => {
                    expect(resSeq.length).toEqual(2);

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(2);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    done();
                }
            );

        });

    });

});
