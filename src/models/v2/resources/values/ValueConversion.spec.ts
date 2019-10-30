import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../../Constants";
import { UpdateIntValue } from "./update-int-value";

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

    it("update an Integer Value without comment", () => {

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

});