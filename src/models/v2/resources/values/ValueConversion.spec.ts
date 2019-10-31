import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../../Constants";
import { CreateIntValue } from "./create/create-int-value";
import { DeleteIntValue } from "./delete/delete-int-value";
import { UpdateIntValue } from "./update/update-int-value";
import { UpdateValuePermissions } from "./update/update-value-permissions";

describe("ValueConversion", () => {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Update a value", () => {

        it("update an Integer Value", () => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg";
            updateIntVal.type = Constants.IntValue;
            updateIntVal.int = 1;

            const result: any = jsonConvert.serializeObject(updateIntVal);

            const expectedResult = {
                "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                "@id": "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg",
                "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 1
            };

            expect(result).toEqual(expectedResult);

        });

        it("update an Integer Value with comment", () => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg";
            updateIntVal.type = Constants.IntValue;
            updateIntVal.int = 1;
            updateIntVal.valueHasComment = "comment on 1";

            const result: any = jsonConvert.serializeObject(updateIntVal);

            const expectedResult = {
                "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                "@id": "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg",
                "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 1,
                "http://api.knora.org/ontology/knora-api/v2#valueHasComment": "comment on 1"
            };

            expect(result).toEqual(expectedResult);

        });

        it("update an Integer Value with permissions", () => {

            const updateIntVal = new UpdateIntValue();

            updateIntVal.id = "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg";
            updateIntVal.type = Constants.IntValue;
            updateIntVal.int = 1;
            updateIntVal.hasPermissions = "RV";

            const result: any = jsonConvert.serializeObject(updateIntVal);

            const expectedResult = {
                "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                "@id": "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg",
                "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 1,
                "http://api.knora.org/ontology/knora-api/v2#hasPermissions": "RV"
            };

            expect(result).toEqual(expectedResult);

        });

        it("update an Integer Value with permissions", () => {

            const updatePermissions = new UpdateValuePermissions();

            updatePermissions.id = "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg";
            updatePermissions.type = Constants.IntValue;
            updatePermissions.hasPermissions = "RV";

            const result: any = jsonConvert.serializeObject(updatePermissions);

            const expectedResult = {
                "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                "@id": "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg",
                "http://api.knora.org/ontology/knora-api/v2#hasPermissions": "RV"
            };

            expect(result).toEqual(expectedResult);

        });

    });

    describe("Create a value", () => {

        it("create an Integer Value without comment", () => {

            const createIntVal = new CreateIntValue();

            createIntVal.type = Constants.IntValue;
            createIntVal.int = 1;

            const result: any = jsonConvert.serializeObject(createIntVal);

            const expectedResult = {
                "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 1
            };

            expect(result).toEqual(expectedResult);

        });

    });

    describe("Create a value", () => {

        it("delete an Integer Value without comment", () => {

            const deleteIntVal = new DeleteIntValue();

            deleteIntVal.id = "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg";
            deleteIntVal.type = Constants.IntValue;
            deleteIntVal.int = 1;

            const result: any = jsonConvert.serializeObject(deleteIntVal);

            const expectedResult = {
                "@id": "http://rdfh.ch/0001/a-thing/values/vp96riPIRnmQcbMhgpv_Rg",
                "@type": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                "http://api.knora.org/ontology/knora-api/v2#intValueAsInt": 1
            };

            expect(result).toEqual(expectedResult);

        });

    });

});