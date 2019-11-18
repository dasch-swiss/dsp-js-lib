import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { Constants } from "../../../models/v2/Constants";
import { UpdateResource } from "../../../models/v2/resources/update/update-resource";
import { CreateBooleanValue } from "../../../models/v2/resources/values/create/create-boolean-value";
import { CreateColorValue } from "../../../models/v2/resources/values/create/create-color-value";
import { CreateDateValue } from "../../../models/v2/resources/values/create/create-date-value";
import { CreateDecimalValue } from "../../../models/v2/resources/values/create/create-decimal-value";
import { CreateStillImageFileValue } from "../../../models/v2/resources/values/create/create-file-value";
import { CreateGeomValue } from "../../../models/v2/resources/values/create/create-geom-value";
import { CreateIntValue } from "../../../models/v2/resources/values/create/create-int-value";
import { CreateIntervalValue } from "../../../models/v2/resources/values/create/create-interval-value";
import { CreateLinkValue } from "../../../models/v2/resources/values/create/create-link-value";
import { CreateListValue } from "../../../models/v2/resources/values/create/create-list-value";
import {
    CreateTextValueAsString,
    CreateTextValueAsXml
} from "../../../models/v2/resources/values/create/create-text-value";
import { CreateUriValue } from "../../../models/v2/resources/values/create/create-uri-value";
import { CreateValue } from "../../../models/v2/resources/values/create/create-value";
import { DeleteValue } from "../../../models/v2/resources/values/delete/delete-value";
import { DeleteValueResponse } from "../../../models/v2/resources/values/delete/delete-value-response";
import { UpdateBooleanValue } from "../../../models/v2/resources/values/update/update-boolean-value";
import { UpdateColorValue } from "../../../models/v2/resources/values/update/update-color-value";
import { UpdateDateValue } from "../../../models/v2/resources/values/update/update-date-value";
import { UpdateDecimalValue } from "../../../models/v2/resources/values/update/update-decimal-value";
import { UpdateStillImageFileValue } from "../../../models/v2/resources/values/update/update-file-value";
import { UpdateGeomValue } from "../../../models/v2/resources/values/update/update-geom-value";
import { UpdateIntValue } from "../../../models/v2/resources/values/update/update-int-value";
import { UpdateIntervalValue } from "../../../models/v2/resources/values/update/update-interval-value";
import { UpdateLinkValue } from "../../../models/v2/resources/values/update/update-link-value";
import { UpdateListValue } from "../../../models/v2/resources/values/update/update-list-value";
import {
    UpdateTextValueAsString,
    UpdateTextValueAsXml
} from "../../../models/v2/resources/values/update/update-text-value";
import { UpdateUriValue } from "../../../models/v2/resources/values/update/update-uri-value";
import { UpdateValue } from "../../../models/v2/resources/values/update/update-value";
import { UpdateValuePermissions } from "../../../models/v2/resources/values/update/update-value-permissions";
import { WriteValueResponse } from "../../../models/v2/resources/values/write-value-response";

const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
const knoraApiConnection = new KnoraApiConnection(config);

describe("ValuesEndpoint", () => {

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method updateValue", () => {

        it("should update an integer value", done => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg";
            updateIntVal.int = 5;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-int-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a decimal value", done => {

            const updateDecimalVal = new UpdateDecimalValue();

            updateDecimalVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/bXMwnrHvQH2DMjOFrGmNzg";
            updateDecimalVal.decimal = 5.6;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal";
            updateResource.value = updateDecimalVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.DecimalValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-decimal-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a color value", done => {

            const updateColorVal = new UpdateColorValue();

            updateColorVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/TAziKNP8QxuyhC4Qf9-b6w";
            updateColorVal.color = "#ff3344";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor";
            updateResource.value = updateColorVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.ColorValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-color-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update an interval value", done => {

            const updateIntervalVal = new UpdateIntervalValue();

            updateIntervalVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/RbDKPKHWTC-0lkRKae-E6A";
            updateIntervalVal.start = 5.6;
            updateIntervalVal.end = 7.8;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval";
            updateResource.value = updateIntervalVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.IntervalValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-interval-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a Boolean value", done => {

            const updateBooleanVal = new UpdateBooleanValue();

            updateBooleanVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/IN4R19yYR0ygi3K2VEHpUQ";
            updateBooleanVal.bool = false;

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean";
            updateResource.value = updateBooleanVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.IntervalValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-boolean-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a list value", done => {

            const updateListVal = new UpdateListValue();

            updateListVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/XAhEeE3kSVqM4JPGdLt4Ew";
            updateListVal.listNode = "http://rdfh.ch/lists/0001/treeList02";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem";
            updateResource.value = updateListVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.ListValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-list-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a link value", done => {

            const updateLinkVal = new UpdateLinkValue();

            updateLinkVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/uvRVxzL1RD-t9VIQ1TpfUw";
            updateLinkVal.linkedResourceIri = "http://rdfh.ch/0001/5IEswyQFQp2bxXDrOyEfEA";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue";
            updateResource.value = updateLinkVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.LinkValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-link-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a URI value", done => {

            const updateUriVal = new UpdateUriValue();

            updateUriVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/uBAmWuRhR-eo1u1eP7qqNg";
            updateUriVal.uri = "https://docs.knora.org";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri";
            updateResource.value = updateUriVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.UriValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-uri-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a text value as string", done => {

            const updateTextVal = new UpdateTextValueAsString();

            updateTextVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/SZyeLLmOTcCCuS3B0VksHQ";
            updateTextVal.text = "This is the updated text.";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = updateTextVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.TextValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-text-value-without-standoff-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a text value as XML", done => {

            const updateTextVal = new UpdateTextValueAsXml();

            updateTextVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/rvB4eQ5MTF-Qxq0YgkwaDg";
            updateTextVal.xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text>\n   This updated text links to another <a class=\"salsah-link\" href=\"http://rdfh.ch/0001/another-thing\">resource</a>.\n</text>";
            updateTextVal.mapping = "http://rdfh.ch/standoff/mappings/StandardMapping";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = updateTextVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.TextValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-text-value-with-standoff-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a date value", done => {

            const updateDateVal = new UpdateDateValue();

            updateDateVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/-rG4F5FTTu2iB5mTBPVn5Q";
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

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate";
            updateResource.value = updateDateVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.DateValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-date-value-with-day-precision-request-expanded.json");

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
                    expect(res.id).toEqual("http://rdfh.ch/0803/7bbb8e59b703/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0803/7bbb8e59b703/values/updated",
                "@type": Constants.DateValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-still-image-file-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update a geom value", done => {

            const updateGeomVal = new UpdateGeomValue();

            updateGeomVal.id = "http://rdfh.ch/0001/http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/we-ybmj-SRen-91n4RaDOQ";
            updateGeomVal.geometryString = "{\"status\":\"active\",\"lineColor\":\"#ff3344\",\"lineWidth\":2,\"points\":[{\"x\":0.08098591549295775,\"y\":0.16741071428571427},{\"x\":0.7394366197183099,\"y\":0.7299107142857143}],\"type\":\"rectangle\",\"original_index\":0}";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasGeometry";
            updateResource.value = updateGeomVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0803/021ec18f1735/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0803/021ec18f1735/values/updated",
                "@type": Constants.GeomValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/update-geometry-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should update an integer value with a comment", done => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg";
            updateIntVal.int = 2;
            updateIntVal.valueHasComment = "comment on 2";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = {
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger": {
                    "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg",
                    "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 2,
                    "http://api.knora.org/ontology/knora-api/v2#valueHasComment": "comment on 2"
                }
            };

            expect(request.data()).toEqual(expectedPayload);
        });

        it("update an integer Value with permissions", done => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg";
            updateIntVal.int = 2;
            updateIntVal.hasPermissions = "RV";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = {
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger": {
                    "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg",
                    "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 2,
                    "http://api.knora.org/ontology/knora-api/v2#hasPermissions": "RV"
                }
            };

            expect(request.data()).toEqual(expectedPayload);

        });

        it("update an integer Value's permissions", done => {

            const updateIntVal = new UpdateValuePermissions();

            updateIntVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg";
            updateIntVal.type = Constants.IntValue;
            updateIntVal.hasPermissions = "RV";

            const updateResource = new UpdateResource<UpdateValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = updateIntVal;

            knoraApiConnection.v2.values.updateValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("PUT");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = {
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger": {
                    "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg",
                    "http://api.knora.org/ontology/knora-api/v2#hasPermissions": "RV"
                }
            };

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("Method createValue", () => {

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.IntervalValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.IntervalValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.ListValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-list-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a link value", done => {

            const createLinkVal = new CreateLinkValue();

            createLinkVal.linkedResourceIri = "http://rdfh.ch/0001/A67ka6UQRHWf313tbhQBjw";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue";
            updateResource.value = createLinkVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.LinkValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

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
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/updated",
                "@type": Constants.UriValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-uri-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a text value as string", done => {

            const updateTextVal = new CreateTextValueAsString();

            updateTextVal.text = "How long is a piece of string?";

            const createResource = new UpdateResource<CreateValue>();

            createResource.id = "http://rdfh.ch/0001/a-thing";
            createResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            createResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            createResource.value = updateTextVal;

            knoraApiConnection.v2.values.createValue(createResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.TextValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-text-value-without-standoff-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a text value as XML", done => {

            const createTextVal = new CreateTextValueAsXml();

            createTextVal.xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text documentType=\"html\">\n    <p>This an <span data-description=\"an &quot;event&quot;\" data-date=\"GREGORIAN:2017-01-27 CE\" class=\"event\">event</span>.</p>\n</text>";
            createTextVal.mapping = "http://rdfh.ch/standoff/mappings/StandardMapping";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = createTextVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.TextValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-text-value-with-standoff-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a date value", done => {

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
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.DateValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-date-value-with-day-precision-request-expanded.json");

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
                    expect(res.id).toEqual("http://rdfh.ch/0803/021ec18f1735/values/created");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0803/021ec18f1735/values/created",
                "@type": Constants.GeomValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-geometry-value-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);
        });

        it("should create a text value with a comment", done => {

            const createTextVal = new CreateTextValueAsString();

            createTextVal.text = "This is the text.";
            createTextVal.valueHasComment = "This is the comment on the text.";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasText";
            updateResource.value = createTextVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.TextValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-text-value-with-comment-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should create a value with permissions", done => {

            const createIntVal = new CreateIntValue();

            createIntVal.int = 4;
            createIntVal.hasPermissions = "CR knora-admin:Creator|V http://rdfh.ch/groups/0001/thing-searcher";

            const updateResource = new UpdateResource<CreateValue>();

            updateResource.id = "http://rdfh.ch/0001/a-thing";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";
            updateResource.value = createIntVal;

            knoraApiConnection.v2.values.createValue(updateResource).subscribe(
                (res: WriteValueResponse) => {
                    expect(res.id).toEqual("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/created",
                "@type": Constants.IntValue
            })));

            expect(request.url).toBe("http://localhost:3333/v2/values");

            expect(request.method).toEqual("POST");

            expect(request.requestHeaders).toEqual({"Content-Type": "application/json; charset=utf-8"});

            const expectedPayload = require("../../../../test/data/api/v2/values/create-int-value-with-custom-permissions-request-expanded.json");

            expect(request.data()).toEqual(expectedPayload);

        });

    });

    describe("Method deleteValue", () => {

        it("should delete a value", done => {

            const deleteVal = new DeleteValue();

            deleteVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg";
            deleteVal.type = "http://api.knora.org/ontology/knora-api/v2#IntValue";

            const updateResource = new UpdateResource<DeleteValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";

            updateResource.value = deleteVal;

            knoraApiConnection.v2.values.deleteValue(updateResource).subscribe(
                (res: DeleteValueResponse) => {
                    expect(res.result).toEqual("Value <http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg> marked as deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(
                {
                    "knora-api:result": "Value <http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg> marked as deleted",
                    "@context": {
                        "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                    }
                }
            )));

            expect(request.url).toBe("http://localhost:3333/v2/values/delete");

            expect(request.method).toEqual("POST");

            const expectedPayload = {
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger": {
                    "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg"
                }
            };

            expect(request.data()).toEqual(expectedPayload);

        });

        it("should delete a value with a comment", done => {

            const deleteVal = new DeleteValue();

            deleteVal.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg";
            deleteVal.type = "http://api.knora.org/ontology/knora-api/v2#IntValue";
            deleteVal.deleteComment = "value is too boring";

            const updateResource = new UpdateResource<DeleteValue>();

            updateResource.id = "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw";
            updateResource.type = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";
            updateResource.property = "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger";

            updateResource.value = deleteVal;

            knoraApiConnection.v2.values.deleteValue(updateResource).subscribe(
                (res: DeleteValueResponse) => {
                    expect(res.result).toEqual("Value <http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg> marked as deleted");
                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(
                {
                    "knora-api:result": "Value <http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg> marked as deleted",
                    "@context": {
                        "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
                    }
                }
            )));

            expect(request.url).toBe("http://localhost:3333/v2/values/delete");

            expect(request.method).toEqual("POST");

            const expectedPayload = {
                "@type": "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing",
                "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw",
                "http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger": {
                    "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "@id": "http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg",
                    "http://api.knora.org/ontology/knora-api/v2#deleteComment": "value is too boring"
                }
            };

            expect(request.data()).toEqual(expectedPayload);

        });

    });
});
