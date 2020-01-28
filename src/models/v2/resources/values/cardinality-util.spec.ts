import { Cardinality, ResourceClassDefinition } from "../../../..";
import { CardinalityUtil } from "../cardinality-util";

describe("CardinalityUtil", () => {

    describe("Determine if a value can be created", () => {

        it("create first value for a property with cardinality 0-1", () => {

            const classDef = new ResourceClassDefinition();

            classDef.propertiesList = [{
                propertyIndex: "myProp",
                cardinality: Cardinality._0_1,
                isInherited: false
            }];

            const createValueAllowed = CardinalityUtil.createValueForPropertyAllowed("myProp", 0, classDef);
            expect(createValueAllowed).toBeTruthy();

        });

    });

});

