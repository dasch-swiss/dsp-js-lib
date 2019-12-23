import { PropertyDefinition } from "../../../ontologies/property-definition";
import { ComparisonOperator } from "./comparison-operator";
import { Expression } from "./expression";

export abstract class ValueLiteral {

    abstract value: any;

    abstract getLiteral(): string;

}

export abstract class SearchValue extends Expression {

    property: PropertyDefinition;

    abstract comparisonOperator: ComparisonOperator;

    abstract valueLiteral?: ValueLiteral;

}
