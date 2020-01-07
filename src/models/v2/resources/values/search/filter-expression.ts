export abstract class FilterExpression {
}

export class FilterAndExpression extends FilterExpression {

    leftArg: FilterExpression;

    rightArg: FilterExpression;

}

export class FilterOrExpression extends FilterExpression {

    leftArg: FilterExpression;

    rightArg: FilterExpression;

}
