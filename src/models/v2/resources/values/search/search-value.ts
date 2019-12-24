import { PropertyDefinition } from "../../../ontologies/property-definition";
import { ComparisonOperator } from "./comparison-operator";
import { Expression } from "./expression";

export abstract class ValueLiteral {

    abstract value: any;

    abstract xsdType: string;

    abstract getValue(): string;

}

export abstract class SearchValue extends Expression {

    abstract property: PropertyDefinition;

    abstract comparisonOperator: ComparisonOperator;

    abstract valueLiteral?: ValueLiteral;

}
