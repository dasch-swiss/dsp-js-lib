import { Constants } from "../../../Constants";
import { PropertyDefinition } from "../../../ontologies/property-definition";
import {
    EqualsOperator, ExistsOperator,
    GreaterThanEqualsOperator, GreaterThanOperator,
    LessThanEqualsOperator, LessThanOperator,
    NotEqualsOperator
} from "./comparison-operator";
import { SearchValue, ValueLiteral } from "./search-value";

export class IntegerValueLiteral extends ValueLiteral {

    xsdType = Constants.XsdInteger;

    constructor(public value: number) {
        super();
    }

    getValue(): string {
        return String(this.value);
    }
}

export class SearchIntegerValue extends SearchValue {

    constructor(public property: PropertyDefinition, public valueLiteral: IntegerValueLiteral, public comparisonOperator: EqualsOperator | NotEqualsOperator
        | GreaterThanEqualsOperator | LessThanEqualsOperator
        | GreaterThanOperator | LessThanOperator
        | ExistsOperator) {
        super();
    }

}
