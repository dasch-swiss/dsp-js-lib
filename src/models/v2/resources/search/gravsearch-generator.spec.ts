import { IResourceClassAndPropertyDefinitions, ResourcePropertyDefinition } from "../../../..";
import { MockOntology } from "../../../../../test/data/api/v2/mockOntology";
import { PropertyDefinition } from "../../ontologies/property-definition";
import { EqualsOperator } from "../values/search/comparison-operator";
import { GroupPattern } from "../values/search/group-pattern";
import { IntegerValueLiteral, SearchIntegerValue } from "../values/search/search-integer-value";
import { GravsearchGenerator } from "./gravsearch-generator";
import { SearchResource } from "./search-resource";

describe("GravsearchGenerator", () => {

    it("should create a Gravsearch query restricted to a certain resource class", () => {

        const searchResource = new SearchResource("http://0.0.0.0:3333/ontology/0001/anything/v2#Thing");

        const gravsearchQuery = GravsearchGenerator.generateGravsearchQuery(searchResource);

        const expectedQuery = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
CONSTRUCT {

?mainRes knora-api:isMainResource true .

} WHERE {

?mainRes a knora-api:Resource .

?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/v2#Thing> .



}
`;

        expect(gravsearchQuery).toEqual(expectedQuery);

    });

    it("should create a Gravsearch query searching for a specific integer value", () => {

        const anythingThing = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

        const mock: IResourceClassAndPropertyDefinitions = MockOntology.mockIResourceClassAndPropertyDefinitions(anythingThing);

        const hasIntegerProp: PropertyDefinition = mock.properties["http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger"];

        const integerValueLiteral = new IntegerValueLiteral(5);

        const searchIntegerValue = new SearchIntegerValue(hasIntegerProp as ResourcePropertyDefinition, integerValueLiteral, new EqualsOperator());

        const searchResource = new SearchResource(anythingThing, [new GroupPattern([searchIntegerValue])]);

        const gravsearchQuery = GravsearchGenerator.generateGravsearchQuery(searchResource);

        console.log(gravsearchQuery);

    });

});
