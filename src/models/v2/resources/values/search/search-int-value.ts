import {
    EqualsOperator, ExistsOperator,
    GreaterThanEqualsOperator, GreaterThanOperator,
    LessThanEqualsOperator, LessThanOperator,
    NotEqualsOperator
} from "./comparison-operator";
import { SearchValue, ValueLiteral } from "./search-value";

export class IntValueLiteral extends ValueLiteral {

    value: number;

    getLiteral(): string {
        return String(this.value);
    }
}

export class SearchIntValue extends SearchValue {

    valueLiteral: IntValueLiteral;

    comparisonOperator: EqualsOperator | NotEqualsOperator
        | GreaterThanEqualsOperator | LessThanEqualsOperator
        | GreaterThanOperator | LessThanOperator
        | ExistsOperator;

}
