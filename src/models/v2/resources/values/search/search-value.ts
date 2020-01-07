import { ResourcePropertyDefinition } from "../../../../..";
import { SearchResource } from "../../search/search-resource";
import { ComparisonOperator } from "./comparison-operator";
import { FilterExpression } from "./filter-expression";

export abstract class ValueLiteral {

    abstract value: any;

    abstract xsdType: string;

    abstract getValue(): string;

}

export abstract class SearchValue extends FilterExpression {

    abstract property: ResourcePropertyDefinition;

    abstract comparisonOperator: ComparisonOperator;

    abstract value?: ValueLiteral | SearchResource;

}
