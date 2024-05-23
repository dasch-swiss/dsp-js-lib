import { of } from "rxjs";
import { MockList } from "../../../../test/data/api/v2/mock-list";
import { MockOntology } from "../../../../test/data/api/v2/mock-ontology";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { Constants } from "../../../models/v2/Constants";
import { ReadResource } from "../../../models/v2/resources/read/read-resource";
import { UpdateResource } from "../../../models/v2/resources/update/update-resource";
import { CreateBooleanValue } from "../../../models/v2/resources/values/create/create-boolean-value";
import { CreateColorValue } from "../../../models/v2/resources/values/create/create-color-value";
import { CreateDateValue } from "../../../models/v2/resources/values/create/create-date-value";
import { CreateDecimalValue } from "../../../models/v2/resources/values/create/create-decimal-value";
import { CreateStillImageFileValue } from "../../../models/v2/resources/values/create/create-file-value";
import { CreateGeomValue } from "../../../models/v2/resources/values/create/create-geom-value";
import { CreateGeonameValue } from "../../../models/v2/resources/values/create/create-geoname-value";
import { CreateIntValue } from "../../../models/v2/resources/values/create/create-int-value";
import { CreateIntervalValue } from "../../../models/v2/resources/values/create/create-interval-value";
import { CreateLinkValue } from "../../../models/v2/resources/values/create/create-link-value";
import { CreateListValue } from "../../../models/v2/resources/values/create/create-list-value";
import {
    CreateTextValueAsString,
    CreateTextValueAsXml
} from "../../../models/v2/resources/values/create/create-text-value";
import { CreateTimeValue } from "../../../models/v2/resources/values/create/create-time-value";
import { CreateUriValue } from "../../../models/v2/resources/values/create/create-uri-value";
import { CreateValue } from "../../../models/v2/resources/values/create/create-value";
import { DeleteValue } from "../../../models/v2/resources/values/delete/delete-value";
import { DeleteValueResponse } from "../../../models/v2/resources/values/delete/delete-value-response";
import { ReadBooleanValue } from "../../../models/v2/resources/values/read/read-boolean-value";
import { ReadColorValue } from "../../../models/v2/resources/values/read/read-color-value";
import { KnoraDate, ReadDateValue } from "../../../models/v2/resources/values/read/read-date-value";
import { ReadDecimalValue } from "../../../models/v2/resources/values/read/read-decimal-value";
import { ReadStillImageFileValue } from "../../../models/v2/resources/values/read/read-file-value";
import { ReadGeomValue } from "../../../models/v2/resources/values/read/read-geom-value";
import { ReadGeonameValue } from "../../../models/v2/resources/values/read/read-geoname-value";
import { ReadIntValue } from "../../../models/v2/resources/values/read/read-int-value";
import { ReadIntervalValue } from "../../../models/v2/resources/values/read/read-interval-value";
import { ReadLinkValue } from "../../../models/v2/resources/values/read/read-link-value";
import { ReadListValue } from "../../../models/v2/resources/values/read/read-list-value";
import {
    ReadTextValueAsString,
    ReadTextValueAsXml
} from "../../../models/v2/resources/values/read/read-text-value";
import { ReadTimeValue } from "../../../models/v2/resources/values/read/read-time-value";
import { UpdateBooleanValue } from "../../../models/v2/resources/values/update/update-boolean-value";
import { UpdateColorValue } from "../../../models/v2/resources/values/update/update-color-value";
import { UpdateDateValue } from "../../../models/v2/resources/values/update/update-date-value";
import { UpdateDecimalValue } from "../../../models/v2/resources/values/update/update-decimal-value";
import { UpdateStillImageFileValue } from "../../../models/v2/resources/values/update/update-file-value";
import { UpdateGeomValue } from "../../../models/v2/resources/values/update/update-geom-value";
import { UpdateGeonameValue } from "../../../models/v2/resources/values/update/update-geoname-value";
import { UpdateIntValue } from "../../../models/v2/resources/values/update/update-int-value";
import { UpdateIntervalValue } from "../../../models/v2/resources/values/update/update-interval-value";
import { UpdateLinkValue } from "../../../models/v2/resources/values/update/update-link-value";
import { UpdateListValue } from "../../../models/v2/resources/values/update/update-list-value";
import {
    UpdateTextValueAsString,
    UpdateTextValueAsXml
} from "../../../models/v2/resources/values/update/update-text-value";
import { UpdateTimeValue } from "../../../models/v2/resources/values/update/update-time-value";
import { UpdateUriValue } from "../../../models/v2/resources/values/update/update-uri-value";
import { UpdateValue } from "../../../models/v2/resources/values/update/update-value";
import { UpdateValuePermissions } from "../../../models/v2/resources/values/update/update-value-permissions";
import { WriteValueResponse } from "../../../models/v2/resources/values/write-value-response";

const config = new KnoraApiConfig("http", "0.0.0.0", 3333, undefined, undefined, true);
let knoraApiConnection: KnoraApiConnection;

let getResourceClassDefinitionFromCacheSpy: jasmine.Spy;
let getListNodeFromCacheSpy: jasmine.Spy;

namespace WriteValueMocks {

    const mockWriteValueResponse = (id: string, type: string, uuid: string, creationDate?: string): string => {
        const res: { [index: string]: string | object } = {
            "@id": id,
            "@type": type,
            [Constants.ValueHasUUID]: uuid
        };

        if (creationDate !== undefined) {
            res[Constants.ValueCreationDate] = {
                "@type": "http://www.w3.org/2001/XMLSchema#dateTimeStamp",
                "@value": creationDate
            };
        }

        return JSON.stringify(res);
    };

    export const mockUpdateValueResponse = (id: string, type: string, uuid: string): string => {
        return mockWriteValueResponse(id, type, uuid);
    };

    export const mockCreateValueResponse = (id: string, type: string, uuid: string, creationDate: string): string => {
        return mockWriteValueResponse(id, type, uuid, creationDate);
    };

}

describe("ValuesEndpoint", () => {

    beforeEach(() => {
        jasmine.Ajax.install();

        knoraApiConnection = new KnoraApiConnection(config);

        getResourceClassDefinitionFromCacheSpy = spyOn(knoraApiConnection.v2.ontologyCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri));
            }
        );

        getListNodeFromCacheSpy = spyOn(knoraApiConnection.v2.listNodeCache, "getNode").and.callFake(
            (listNodeIri: string) => {
                return of(MockList.mockNode(listNodeIri));
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getValue", () => {

        it("should read an integer value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "dJ1ES8QTQNepFKF5-EAqdg").subscribe(
                (res: ReadResource) => {
                    const intVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger", ReadIntValue);
                    expect(intVal.length).toEqual(1);
                    expect(intVal[0].int).toEqual(1);

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-int-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/dJ1ES8QTQNepFKF5-EAqdg");

            expect(request.method).toEqual("GET");

        });

        it("should read a decimal value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "bXMwnrHvQH2DMjOFrGmNzg-EAqdg").subscribe(
                (res: ReadResource) => {
                    const decVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal", ReadDecimalValue);
                    expect(decVal.length).toEqual(1);
                    expect(decVal[0].decimal).toBeCloseTo(1.5, 1);

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-decimal-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/bXMwnrHvQH2DMjOFrGmNzg-EAqdg");

            expect(request.method).toEqual("GET");

        });

        it("should read a color value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "TAziKNP8QxuyhC4Qf9-b6w").subscribe(
                (res: ReadResource) => {
                    const colorVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor", ReadColorValue);
                    expect(colorVal.length).toEqual(1);
                    expect(colorVal[0].color).toEqual("#ff3333");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-color-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/TAziKNP8QxuyhC4Qf9-b6w");

            expect(request.method).toEqual("GET");

        });

        it("should read an interval value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "RbDKPKHWTC-0lkRKae-E6A").subscribe(
                (res: ReadResource) => {
                    const intervalVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval", ReadIntervalValue);
                    expect(intervalVal.length).toEqual(1);
                    expect(intervalVal[0].start).toEqual(0);
                    expect(intervalVal[0].end).toEqual(216000);

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-interval-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/RbDKPKHWTC-0lkRKae-E6A");

            expect(request.method).toEqual("GET");

        });

        it("should read an Boolean value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "IN4R19yYR0ygi3K2VEHpUQ").subscribe(
                (res: ReadResource) => {
                    const boolVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean", ReadBooleanValue);
                    expect(boolVal.length).toEqual(1);
                    expect(boolVal[0].bool).toBeTruthy();

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-boolean-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/IN4R19yYR0ygi3K2VEHpUQ");

            expect(request.method).toEqual("GET");

        });

        it("should read a list value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "XAhEeE3kSVqM4JPGdLt4Ew").subscribe(
                (res: ReadResource) => {
                    const listVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem", ReadListValue);
                    expect(listVal.length).toEqual(1);
                    expect(listVal[0].listNode).toEqual("http://rdfh.ch/lists/0001/treeList01");
                    expect(listVal[0].listNodeLabel).toEqual("Tree list node 01");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getListNodeFromCacheSpy).toHaveBeenCalledWith("http://rdfh.ch/lists/0001/treeList01");

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-list-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/XAhEeE3kSVqM4JPGdLt4Ew");

            expect(request.method).toEqual("GET");

        });

        it("should read an link value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "uvRVxzL1RD-t9VIQ1TpfUw").subscribe(
                (res: ReadResource) => {
                    const linkVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue", ReadLinkValue);
                    expect(linkVal.length).toEqual(1);
                    expect(linkVal[0].linkedResourceIri).toEqual("http://rdfh.ch/0001/0C-0L1kORryKzJAJxxRyRQ");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(2);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-link-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/uvRVxzL1RD-t9VIQ1TpfUw");

            expect(request.method).toEqual("GET");

        });

        it("should read a text value without standoff", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "SZyeLLmOTcCCuS3B0VksHQ").subscribe(
                (res: ReadResource) => {
                    const textVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasText", ReadTextValueAsString);
                    expect(textVal.length).toEqual(1);
                    expect(textVal[0].text).toEqual("test");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-text-value-without-standoff-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/SZyeLLmOTcCCuS3B0VksHQ");

            expect(request.method).toEqual("GET");

        });

        it("should read a text value with standoff", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "rvB4eQ5MTF-Qxq0YgkwaDg").subscribe(
                (res: ReadResource) => {
                    const textVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext", ReadTextValueAsXml);
                    expect(textVal.length).toEqual(1);
                    expect(textVal[0].xml).toEqual("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text><p>test with <strong>markup</strong></p></text>");
                    expect(textVal[0].mapping).toEqual("http://rdfh.ch/standoff/mappings/StandardMapping");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-text-value-with-standoff-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/rvB4eQ5MTF-Qxq0YgkwaDg");

            expect(request.method).toEqual("GET");

        });

        it("should read a date value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "-rG4F5FTTu2iB5mTBPVn5Q").subscribe(
                (res: ReadResource) => {
                    const dateVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate", ReadDateValue);
                    expect(dateVal.length).toEqual(1);
                    expect(dateVal[0].date instanceof KnoraDate).toBeTruthy();
                    expect((dateVal[0].date as KnoraDate).calendar).toEqual("GREGORIAN");
                    expect((dateVal[0].date as KnoraDate).day).toEqual(13);
                    expect((dateVal[0].date as KnoraDate).month).toEqual(5);
                    expect((dateVal[0].date as KnoraDate).year).toEqual(2018);
                    expect((dateVal[0].date as KnoraDate).era).toEqual("CE");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-date-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/-rG4F5FTTu2iB5mTBPVn5Q");

            expect(request.method).toEqual("GET");

        });

        it("should read a date value (Islamic)", done => {

            // test data for Islamic date has been created manually!

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "-rG4F5FTTu2iB5mTBPVn5Q").subscribe(
                (res: ReadResource) => {
                    const dateVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate", ReadDateValue);
                    expect(dateVal.length).toEqual(1);
                    expect(dateVal[0].date instanceof KnoraDate).toBeTruthy();
                    expect((dateVal[0].date as KnoraDate).calendar).toEqual("ISLAMIC");
                    expect((dateVal[0].date as KnoraDate).day).toEqual(27);
                    expect((dateVal[0].date as KnoraDate).month).toEqual(8);
                    expect((dateVal[0].date as KnoraDate).year).toEqual(1439);
                    expect((dateVal[0].date as KnoraDate).era).toEqual("noEra");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/manually-generated/get-islamic-date-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/-rG4F5FTTu2iB5mTBPVn5Q");

            expect(request.method).toEqual("GET");

        });

        it("should read a still image file value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "goZ7JFRNSeqF-dNxsqAS7Q").subscribe(
                (res: ReadResource) => {
                    const stillImageVal = res.getValuesAs("http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue", ReadStillImageFileValue);
                    expect(stillImageVal.length).toEqual(1);
                    expect(stillImageVal[0].filename).toEqual("B1D0OkEgfFp-Cew2Seur7Wi.jp2");
                    expect(stillImageVal[0].dimX).toEqual(512);

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#ThingPicture");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-still-image-file-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/goZ7JFRNSeqF-dNxsqAS7Q");

            expect(request.method).toEqual("GET");

        });

        it("should read a geometry value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "we-ybmj-SRen-91n4RaDOQ").subscribe(
                (res: ReadResource) => {
                    const geomVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeometry", ReadGeomValue);
                    expect(geomVal.length).toEqual(1);
                    expect(geomVal[0].geometry.type).toEqual("rectangle");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-geom-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/we-ybmj-SRen-91n4RaDOQ");

            expect(request.method).toEqual("GET");

        });

        it("should read a Geoname value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "hty-ONF8SwKN2RKU7rLKDg").subscribe(
                (res: ReadResource) => {
                    const geomVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeoname", ReadGeonameValue);
                    expect(geomVal.length).toEqual(1);
                    expect(geomVal[0].geoname).toEqual("2661604");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-geoname-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/hty-ONF8SwKN2RKU7rLKDg");

            expect(request.method).toEqual("GET");

        });

        it("should read a time value", done => {

            knoraApiConnection.v2.values.getValue("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", "l6DhS5SCT9WhXSoYEZRTRw").subscribe(
                (res: ReadResource) => {
                    const geomVal = res.getValuesAs("http://0.0.0.0:3333/ontology/0001/anything/v2#hasTimeStamp", ReadTimeValue);
                    expect(geomVal.length).toEqual(1);
                    expect(geomVal[0].time).toEqual("2019-08-30T10:45:20.173572Z");

                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledTimes(1);
                    expect(getResourceClassDefinitionFromCacheSpy).toHaveBeenCalledWith("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

                    expect(getListNodeFromCacheSpy).toHaveBeenCalledTimes(0);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const resource = require("../../../../test/data/api/v2/values/get-time-value-response-expanded.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(resource)));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw/l6DhS5SCT9WhXSoYEZRTRw");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method updateValue", () => {

        it("should check mocked update value response", () => {

            const mockedUpdateIntValueResponse = WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/ADHkEJicT1qjuoEgFyfPIg",
                Constants.IntValue,
                "NwAp_UmGRlWTOCss0Yfwbw");

            const updateIntValueResponse = require("../../../../test/data/api/v2/values/update-int-value-response-expanded.json");

            // TODO: remove this bad hack once test data is stable
            updateIntValueResponse["@id"] = "http://rdfh.ch/0001/a-thing/values/ADHkEJicT1qjuoEgFyfPIg";
            updateIntValueResponse["http://api.knora.org/ontology/knora-api/v2#valueHasUUID"] = "NwAp_UmGRlWTOCss0Yfwbw";

            expect(JSON.parse(mockedUpdateIntValueResponse)).toEqual(updateIntValueResponse);

        });

        it("should update an integer value", done => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/a-thing/values/Gdp7h5fOTEaxJEvoTXIW5A";
            updateIntVal.int = 5;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.IntValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(
                WriteValueMocks.mockUpdateValueResponse(
                    "http://rdfh.ch/0001/a-thing/values/updated",
                    Constants.IntValue,
                    "uuid")
            ));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-int-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger"]["@id"] = "http://rdfh.ch/0001/a-thing/values/Gdp7h5fOTEaxJEvoTXIW5A";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a decimal value", done => {

            const updateDecimalVal = new UpdateDecimalValue();

            updateDecimalVal.id = "http://rdfh.ch/0001/a-thing/values/7Rl2CDFTSIGE04RyB1CG2w";
            updateDecimalVal.decimal = 5.6;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal";
            updateResource.value = updateDecimalVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.DecimalValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.DecimalValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-decimal-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal"]["@id"] = "http://rdfh.ch/0001/a-thing/values/7Rl2CDFTSIGE04RyB1CG2w";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a color value", done => {

            const updateColorVal = new UpdateColorValue();

            updateColorVal.id = "http://rdfh.ch/0001/a-thing/values/74h6nw99Rgiww0y_n2sspQ";
            updateColorVal.color = "#ff3344";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor";
            updateResource.value = updateColorVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.ColorValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.ColorValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-color-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor"]["@id"] = "http://rdfh.ch/0001/a-thing/values/74h6nw99Rgiww0y_n2sspQ";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update an interval value", done => {

            const updateIntervalVal = new UpdateIntervalValue();

            updateIntervalVal.id = "http://rdfh.ch/0001/a-thing/values/W5_dZsbwTTWj9E4J5WlIJA";
            updateIntervalVal.start = 5.6;
            updateIntervalVal.end = 7.8;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval";
            updateResource.value = updateIntervalVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.IntervalValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.IntervalValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-interval-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval"]["@id"] = "http://rdfh.ch/0001/a-thing/values/W5_dZsbwTTWj9E4J5WlIJA";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a Boolean value", done => {

            const updateBooleanVal = new UpdateBooleanValue();

            updateBooleanVal.id = "http://rdfh.ch/0001/a-thing/values/-B-cx99VScG5vBXyM5F5tg";
            updateBooleanVal.bool = false;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean";
            updateResource.value = updateBooleanVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.BooleanValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.BooleanValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-boolean-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean"]["@id"] = "http://rdfh.ch/0001/a-thing/values/-B-cx99VScG5vBXyM5F5tg";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a list value", done => {

            const updateListVal = new UpdateListValue();

            updateListVal.id = "http://rdfh.ch/0001/a-thing/values/C91T8eVmTD2suPhq6RBNAw";
            updateListVal.listNode = "http://rdfh.ch/lists/0001/treeList02";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem";
            updateResource.value = updateListVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.ListValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.ListValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-list-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem"]["@id"] = "http://rdfh.ch/0001/a-thing/values/C91T8eVmTD2suPhq6RBNAw";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a link value", done => {

            const updateLinkVal = new UpdateLinkValue();

            updateLinkVal.id = "http://rdfh.ch/0001/a-thing/values/vLpKgz66Sn2tyUYJSJ5B5A";
            updateLinkVal.linkedResourceIri = "http://rdfh.ch/0001/5IEswyQFQp2bxXDrOyEfEA";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue";
            updateResource.value = updateLinkVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.LinkValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.LinkValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-link-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue"]["@id"] = "http://rdfh.ch/0001/a-thing/values/vLpKgz66Sn2tyUYJSJ5B5A";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a URI value", done => {

            const updateUriVal = new UpdateUriValue();

            updateUriVal.id = "http://rdfh.ch/0001/a-thing/values/ozzNaZM7T6OILHJbxv4MGw";
            updateUriVal.uri = "https://docs.knora.org";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri";
            updateResource.value = updateUriVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.UriValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.UriValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-uri-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri"]["@id"] = "http://rdfh.ch/0001/a-thing/values/ozzNaZM7T6OILHJbxv4MGw";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a text value as string", done => {

            const updateTextVal = new UpdateTextValueAsString();

            updateTextVal.id = "http://rdfh.ch/0001/a-thing/values/pHuFhBelROGexp2IhaLQAg";
            updateTextVal.text = "text without standoff updated";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = updateTextVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.TextValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.TextValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-text-value-without-standoff-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasText"]["@id"] = "http://rdfh.ch/0001/a-thing/values/pHuFhBelROGexp2IhaLQAg";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a text value as XML", done => {

            const updateTextVal = new UpdateTextValueAsXml();

            updateTextVal.id = "http://rdfh.ch/0001/a-thing/values/I4OWMilwQwaYvaN5wlUIqg";
            updateTextVal.xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text>\n   This updated text links to another <a class=\"salsah-link\" href=\"http://rdfh.ch/0001/another-thing\">resource</a>.\n</text>";
            updateTextVal.mapping = "http://rdfh.ch/standoff/mappings/StandardMapping";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = updateTextVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.TextValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.TextValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-text-value-with-standoff-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasText"]["@id"] = "http://rdfh.ch/0001/a-thing/values/I4OWMilwQwaYvaN5wlUIqg";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a date value with day precision", done => {

            const updateDateVal = new UpdateDateValue();

            updateDateVal.id = "http://rdfh.ch/0001/a-thing/values/80rXchZpShyfQShMi-JZbA";
            updateDateVal.calendar = "GREGORIAN";
            updateDateVal.startYear = 2018;
            updateDateVal.startMonth = 10;
            updateDateVal.startDay = 5;
            updateDateVal.startEra = "CE";
            updateDateVal.endYear = 2018;
            updateDateVal.endMonth = 12;
            updateDateVal.endDay = 6;
            updateDateVal.endEra = "CE";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = updateDateVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.DateValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.DateValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-date-value-with-day-precision-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate"]["@id"] = "http://rdfh.ch/0001/a-thing/values/80rXchZpShyfQShMi-JZbA";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a date value with month precision", done => {

            const updateDateVal = new UpdateDateValue();

            updateDateVal.id = "http://rdfh.ch/0001/a-thing/values/iNqkXFcwQ6Gx3HQc40d-Vg";
            updateDateVal.calendar = "GREGORIAN";
            updateDateVal.startYear = 2018;
            updateDateVal.startMonth = 9;
            updateDateVal.startEra = "CE";
            updateDateVal.endYear = 2018;
            updateDateVal.endMonth = 12;
            updateDateVal.endEra = "CE";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = updateDateVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.DateValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.DateValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-date-value-with-month-precision-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate"]["@id"] = "http://rdfh.ch/0001/a-thing/values/iNqkXFcwQ6Gx3HQc40d-Vg";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a date value with year precision", done => {

            const updateDateVal = new UpdateDateValue();

            updateDateVal.id = "http://rdfh.ch/0001/a-thing/values/OYIThVCdSC63y-nmT805CA";
            updateDateVal.calendar = "GREGORIAN";
            updateDateVal.startYear = 2018;
            updateDateVal.startEra = "CE";
            updateDateVal.endYear = 2020;
            updateDateVal.endEra = "CE";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = updateDateVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.DateValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.DateValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-date-value-with-year-precision-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate"]["@id"] = "http://rdfh.ch/0001/a-thing/values/OYIThVCdSC63y-nmT805CA";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a still image file value", done => {

            const updateStillImageFileVal = new UpdateStillImageFileValue();

            updateStillImageFileVal.id = "http://rdfh.ch/0001/a-thing-picture/values/goZ7JFRNSeqF-dNxsqAS7Q";
            updateStillImageFileVal.filename = "IQUO3t1AABm-FSLC0vNvVpr.jp2";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing-picture";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#ThingPicture";
            updateResource.property = "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue";
            updateResource.value = updateStillImageFileVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.StillImageFileValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.StillImageFileValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-still-image-file-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue"]["@id"] = "http://rdfh.ch/0001/a-thing-picture/values/goZ7JFRNSeqF-dNxsqAS7Q";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a geom value", done => {

            const updateGeomVal = new UpdateGeomValue();

            updateGeomVal.id = "http://rdfh.ch/0001/a-thing/values/_Re6H2ZoQQq8YVgB4HQyjQ";
            updateGeomVal.geometryString = "{\"status\":\"active\",\"lineColor\":\"#ff3344\",\"lineWidth\":2,\"points\":[{\"x\":0.08098591549295775,\"y\":0.16741071428571427},{\"x\":0.7394366197183099,\"y\":0.7299107142857143}],\"type\":\"rectangle\",\"original_index\":0}";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeometry";
            updateResource.value = updateGeomVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.GeomValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.GeomValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-geometry-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeometry"]["@id"] = "http://rdfh.ch/0001/a-thing/values/_Re6H2ZoQQq8YVgB4HQyjQ";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a geoname value", done => {

            const updateGeomVal = new UpdateGeonameValue();

            updateGeomVal.id = "http://rdfh.ch/0001/a-thing/values/U7gJk99-SNq45u7Y3PvTDQ";
            updateGeomVal.geoname = "2988507";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeoname";
            updateResource.value = updateGeomVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.GeonameValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.GeonameValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-geoname-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeoname"]["@id"] = "http://rdfh.ch/0001/a-thing/values/U7gJk99-SNq45u7Y3PvTDQ";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a time value", done => {

            const updateTimeVal = new UpdateTimeValue();

            updateTimeVal.id = "http://rdfh.ch/0001/a-thing/values/W3U0fhwIQn-NrT0jILRoGA";
            updateTimeVal.time = "2019-12-16T09:14:56.409249Z";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasTimeStamp";
            updateResource.value = updateTimeVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.TimeValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.TimeValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-time-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasTimeStamp"]["@id"] = "http://rdfh.ch/0001/a-thing/values/W3U0fhwIQn-NrT0jILRoGA";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update an integer value with a comment", done => {

            const updateTextVal = new UpdateTextValueAsString();

            updateTextVal.id = "http://rdfh.ch/0001/a-thing/values/NVRw0-VkQL2YdI_kgkV33Q";
            updateTextVal.text = "text without standoff updated";
            updateTextVal.valueHasComment = "Adding a comment";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = updateTextVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.IntValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.IntValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-text-value-with-comment-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasText"]["@id"] = "http://rdfh.ch/0001/a-thing/values/NVRw0-VkQL2YdI_kgkV33Q";

            expect(request.data()).toEqual(expectedPayload);
        });

        it("update an integer value and its permissions", done => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/a-thing/values/ZF5QPWhcT1e7mqNFoJOjGA";
            updateIntVal.int = 3879;
            updateIntVal.hasPermissions = "CR http://rdfh.ch/groups/0001/thing-searcher";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.IntValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.IntValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-int-value-with-custom-permissions-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger"]["@id"] = "http://rdfh.ch/0001/a-thing/values/ZF5QPWhcT1e7mqNFoJOjGA";

            expect(request.data()).toEqual(expectedPayload);

        });

        it("update an integer value's permissions", done => {

            const updateIntVal = new UpdateValuePermissions();

            updateIntVal.id = "http://rdfh.ch/0001/a-thing/values/ADHkEJicT1qjuoEgFyfPIg";
            updateIntVal.type = Constants.IntValue;
            updateIntVal.hasPermissions = "CR http://rdfh.ch/groups/0001/thing-searcher|V knora-admin:KnownUser";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/a-thing/values/updated");
                    expect(res.type).toEqual(Constants.IntValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockUpdateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/updated",
                Constants.IntValue,
                "uuid")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/update-int-value-permissions-only-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger"]["@id"] = "http://rdfh.ch/0001/a-thing/values/ADHkEJicT1qjuoEgFyfPIg";

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("Method createValue", () => {

        it("should check mocked create value response", () => {

            const mockedUpdateIntValueResponse = WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/a-thing/values/Gdp7h5fOTEaxJEvoTXIW5A",
                Constants.IntValue,
                "NwAp_UmGRlWTOCss0Yfwbw",
                "2020-10-21T23:36:29.290428Z");

            const createIntValueResponse = require("../../../../test/data/api/v2/values/create-int-value-response-expanded.json");

            // TODO: remove this bad hack once test data is stable
            createIntValueResponse["@id"] = "http://rdfh.ch/0001/a-thing/values/Gdp7h5fOTEaxJEvoTXIW5A";
            createIntValueResponse["http://api.knora.org/ontology/knora-api/v2#valueHasUUID"] = "NwAp_UmGRlWTOCss0Yfwbw";
            createIntValueResponse["http://api.knora.org/ontology/knora-api/v2#valueCreationDate"]["@value"] = "2020-10-21T23:36:29.290428Z";

            expect(JSON.parse(mockedUpdateIntValueResponse)).toEqual(createIntValueResponse);

        });

        it("should create an integer value", done => {

            const createIntVal = new CreateIntValue();
            createIntVal.int = 4;

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = createIntVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.IntValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.IntValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-int-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should create a decimal value", done => {

            const createDecimalVal = new CreateDecimalValue();

            createDecimalVal.decimal = 4.3;

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal";
            updateResource.value = createDecimalVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.DecimalValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.DecimalValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-decimal-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should create a color value", done => {

            const createColorVal = new CreateColorValue();

            createColorVal.color = "#ff3333";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor";
            updateResource.value = createColorVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.ColorValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.ColorValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-color-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should create an interval value", done => {

            const createIntervalVal = new CreateIntervalValue();

            createIntervalVal.start = 1.2;
            createIntervalVal.end = 3.4;

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval";
            updateResource.value = createIntervalVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.IntervalValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.IntervalValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-interval-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a Boolean value", done => {

            const createBooleanVal = new CreateBooleanValue();
            createBooleanVal.bool = true;

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean";
            updateResource.value = createBooleanVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.BooleanValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.BooleanValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-boolean-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a list value", done => {

            const createListVal = new CreateListValue();

            createListVal.listNode = "http://rdfh.ch/lists/0001/treeList03";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem";
            updateResource.value = createListVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.ListValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.ListValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-list-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a link value", done => {

            const createLinkVal = new CreateLinkValue();

            createLinkVal.linkedResourceIri = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue";
            updateResource.value = createLinkVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.LinkValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.LinkValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-link-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a URI value", done => {

            const updateUriVal = new CreateUriValue();

            updateUriVal.uri = "https://www.knora.org";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri";
            updateResource.value = updateUriVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.UriValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.UriValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-uri-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a text value as string", done => {

            const updateTextVal = new CreateTextValueAsString();

            updateTextVal.text = "text without standoff";

            const createResource = new UpdateResource<CreateValue>();

            createResource.id = "http://rdfh.ch/0001/a-thing";
            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            createResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            createResource.value = updateTextVal;

            knoraApiConnection.v2.values.createValue(createResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.TextValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.TextValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-text-value-without-standoff-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a text value as XML", done => {

            const createTextVal = new CreateTextValueAsXml();

            createTextVal.xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text>\n   This text links to another <a class=\"salsah-link\" href=\"http://rdfh.ch/0001/another-thing\">resource</a>.\n   And this <strong id=\"link_id\">strong value</strong> is linked by this <a class=\"internal-link\" href=\"#link_id\">link</a>\n</text>";
            createTextVal.mapping = "http://rdfh.ch/standoff/mappings/StandardMapping";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = createTextVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.TextValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.TextValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-text-value-with-standoff-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a date value with day precision", done => {

            const createDateVal = new CreateDateValue();

            createDateVal.calendar = "GREGORIAN";
            createDateVal.startYear = 2018;
            createDateVal.startMonth = 10;
            createDateVal.startDay = 5;
            createDateVal.startEra = "CE";
            createDateVal.endYear = 2018;
            createDateVal.endMonth = 10;
            createDateVal.endDay = 6;
            createDateVal.endEra = "CE";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = createDateVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.DateValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.DateValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-date-value-with-day-precision-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a date value with month precision", done => {

            const createDateVal = new CreateDateValue();

            createDateVal.calendar = "GREGORIAN";
            createDateVal.startYear = 2018;
            createDateVal.startMonth = 10;
            createDateVal.startEra = "CE";
            createDateVal.endYear = 2018;
            createDateVal.endMonth = 11;
            createDateVal.endEra = "CE";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = createDateVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.DateValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.DateValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-date-value-with-month-precision-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a date value with year precision", done => {

            const createDateVal = new CreateDateValue();

            createDateVal.calendar = "GREGORIAN";
            createDateVal.startYear = 2018;
            createDateVal.startEra = "CE";
            createDateVal.endYear = 2019;
            createDateVal.endEra = "CE";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = createDateVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.DateValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.DateValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-date-value-with-year-precision-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a geom value", done => {

            const updateGeomVal = new CreateGeomValue();

            updateGeomVal.geometryString = "{\"status\":\"active\",\"lineColor\":\"#ff3333\",\"lineWidth\":2,\"points\":[{\"x\":0.08098591549295775,\"y\":0.16741071428571427},{\"x\":0.7394366197183099,\"y\":0.7299107142857143}],\"type\":\"rectangle\",\"original_index\":0}";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeometry";
            updateResource.value = updateGeomVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.GeomValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.GeomValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-geometry-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a time value", done => {

            const createTimeVal = new CreateTimeValue();

            createTimeVal.time = "2019-08-28T15:59:12.725007Z";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasTimeStamp";
            updateResource.value = createTimeVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.TimeValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.TimeValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-time-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should attempt to create a still image file value", () => {

            const createStillImageFileVal = new CreateStillImageFileValue();

            expect(createStillImageFileVal.type).toEqual("http://api.knora.org/ontology/knora-api/v2#StillImageFileValue");

            createStillImageFileVal.filename = "IQUO3t1AABm-FSLC0vNvVpr.jp2";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing-picture";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#ThingPicture";
            updateResource.property = "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue";
            updateResource.value = createStillImageFileVal;

            expect(
                () => {
                    knoraApiConnection.v2.values.createValue(updateResource);
                }).toThrow(new Error("A value of type CreateFileValue can only be created with a new resource"));

        });

        it("should create a geoname value", done => {

            const createGeomVal = new CreateGeonameValue();

            createGeomVal.geoname = "2661604";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeoname";
            updateResource.value = createGeomVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.GeonameValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.GeonameValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-geoname-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a text value with a comment", done => {

            const createTextVal = new CreateTextValueAsString();

            createTextVal.text = "this is a text value that has a comment";
            createTextVal.valueHasComment = "this is a comment";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = createTextVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.TextValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.TextValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-text-value-with-comment-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should create a value with permissions", done => {

            const createIntVal = new CreateIntValue();

            createIntVal.int = 1;
            createIntVal.hasPermissions = "CR knora-admin:Creator|V http://rdfh.ch/groups/0001/thing-searcher";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = createIntVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    expect(res.type).toEqual(Constants.IntValue);
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(WriteValueMocks.mockCreateValueResponse(
                "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                Constants.IntValue,
                "uuid",
                "2019-01-09T15:45:54.502951Z")));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({
                "Content-Type": "application/json; charset=utf-8",
                "X-Asset-Ingested": "true"
            });

            const expectedPayload = require("../../../../test/data/api/v2/values/create-int-value-with-custom-permissions-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("Method deleteValue", () => {

        it("should delete a value with a comment", done => {

            const deleteVal = new DeleteValue();

            deleteVal.id = "http://rdfh.ch/0001/a-thing/values/OvVdty6hTg2uSYE6Mukhnw";
            deleteVal.type = "http://api.knora.org/ontology/knora-api/v2#IntValue";
            deleteVal.deleteComment = "this value was incorrect";

            const updateResource = new UpdateResource<DeleteValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";

            updateResource.value = deleteVal;

            knoraApiConnection.v2.values.deleteValue(updateResource).subscribe(
                (res: DeleteValueResponse) => {
                    expect(res.result).toEqual("Value <http://rdfh.ch/0001/a-thing/values/OvVdty6hTg2uSYE6Mukhnw> marked as deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(
                {
                    "knora-api:result": "Value <http://rdfh.ch/0001/a-thing/values/OvVdty6hTg2uSYE6Mukhnw> marked as deleted",
                    "@context": {
                        "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                    }
                }
            )));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/delete");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/values/delete-int-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger"]["@id"] = "http://rdfh.ch/0001/a-thing/values/OvVdty6hTg2uSYE6Mukhnw";

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should delete a value without a comment", done => {

            const deleteVal = new DeleteValue();

            deleteVal.id = "http://rdfh.ch/0001/a-thing/values/SR199iTcT5GMbUig36YwOA";
            deleteVal.type = "http://api.knora.org/ontology/knora-api/v2#LinkValue";

            const updateResource = new UpdateResource<DeleteValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue";

            updateResource.value = deleteVal;

            knoraApiConnection.v2.values.deleteValue(updateResource).subscribe(
                (res: DeleteValueResponse) => {
                    expect(res.result).toEqual("Value <http://rdfh.ch/0001/a-thing/values/SR199iTcT5GMbUig36YwOA> marked as deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(
                {
                    "knora-api:result": "Value <http://rdfh.ch/0001/a-thing/values/SR199iTcT5GMbUig36YwOA> marked as deleted",
                    "@context": {
                        "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                    }
                }
            )));

            expect(request.url).toBe("http://0.0.0.0:3333/v2/values/delete");

            expect(request.method).toEqual("POST");

            const expectedPayload = require("../../../../test/data/api/v2/values/delete-link-value-request-expanded.json");

            // TODO: remove this bad hack once test data is stable
            expectedPayload["http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue"]["@id"] = "http://rdfh.ch/0001/a-thing/values/SR199iTcT5GMbUig36YwOA";

            expect(request.data()).toEqual(expectedPayload);

        });

    });
});
