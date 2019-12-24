import { Constants } from "../../Constants";
import { AndExpression, Expression, OrExpression } from "../values/search/expression";
import { SearchValue, ValueLiteral } from "../values/search/search-value";
import { SearchResource } from "./search-resource";

export namespace GravsearchGenerator {

    const complexTypeToProp = {
        "http://api.knora.org/ontology/knora-api/v2#IntValue": Constants.IntValueAsInt,
        "http://api.knora.org/ontology/knora-api/v2#DecimalValue": Constants.DecimalValueAsDecimal,
        "http://api.knora.org/ontology/knora-api/v2#BooleanValue": Constants.BooleanValueAsBoolean,
        "http://api.knora.org/ontology/knora-api/v2#TextValue": Constants.ValueAsString,
        "http://api.knora.org/ontology/knora-api/v2#UriValue": Constants.UriValueAsUri,
        "http://api.knora.org/ontology/knora-api/v2#ListValue": Constants.ListValueAsListNode
    };

    export const generateGravsearchQuery = (searchResource: SearchResource): string => {

        // class restriction for the resource searched for
        let mainResourceClass = "";

        // if given, create the class restriction for the main resource
        if (searchResource.type !== undefined) {
            mainResourceClass = `?mainRes a <${searchResource.type}> .`;
        }

        const statements: string[] = [];
        const filters: string[] = [];

        // create statements for non-linking properties (restrictions)
        searchResource.properties.forEach(
            (prop: Expression, index: number) => {

                const propValue = `?propVal${index}`;

                if (prop instanceof SearchValue) {
                    // add statement from resource to value object
                    statements.push(`?mainRes <${prop.property.id}> ${propValue} .`);

                    if (!prop.property.isLinkProperty) {
                        // not a link property

                        // add statement from value object to value literal variable
                        const objectType: string = prop.property.objectType as string;
                        const propValueLiteral = `${propValue}Literal`;

                        // @ts-ignore
                        statements.push(`${propValue} <${complexTypeToProp[objectType]}> ${propValueLiteral}`);

                        // add to FILTER
                        // TODO: check that comparison operator is not EXISTS
                        const comparisonOperator = prop.comparisonOperator.type;

                        let valueLiteral: ValueLiteral;

                        if (prop.value !== undefined && prop.value instanceof ValueLiteral) {
                            valueLiteral = prop.value;
                        } else {
                            throw new Error("Value is expected to be a literal.");
                        }

                        filters.push(`FILTER(${propValueLiteral} ${comparisonOperator} "${valueLiteral.getValue()}"^^<${prop.value!.xsdType}>)`);
                    } else {
                        // link property
                    }
                } else if (prop instanceof AndExpression) {
                    // handle logical AND

                } else if (prop instanceof OrExpression) {
                    // handle logical OR

                } else {
                    throw new Error("Unknown Expression " + prop);
                }

            }
        );

        const gravsearchQuery = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
CONSTRUCT {

?mainRes knora-api:isMainResource true .

} WHERE {

?mainRes a knora-api:Resource .

${mainResourceClass}

${statements.join("\n")}
${filters.join("\n")}
}
`;

        return gravsearchQuery;

    };

}
