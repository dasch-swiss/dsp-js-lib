import { PropertyDefinition } from "../../../ontologies/property-definition";
import { ComparisonOperator } from "./comparison-operator";

export abstract class ValueLiteral {

    value: any;

    abstract toSparql(): string;

}

export abstract class SearchValue {

    property: PropertyDefinition;

    comparisonOperator: ComparisonOperator;

    valueLiteral?: ValueLiteral;

}
