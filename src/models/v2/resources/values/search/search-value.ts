import { ResourcePropertyDefinition } from "../../../../..";
import { SearchResource } from "../../search/search-resource";
import { ComparisonOperator } from "./comparison-operator";
import { Expression } from "./expression";

export abstract class ValueLiteral {

    abstract value: any;

    abstract xsdType: string;

    abstract getValue(): string;

}

export abstract class SearchValue extends Expression {

    abstract property: ResourcePropertyDefinition;

    abstract comparisonOperator: ComparisonOperator;

    abstract value?: ValueLiteral | SearchResource;

}
