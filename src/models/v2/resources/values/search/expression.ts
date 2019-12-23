export abstract class Expression {
}

export class AndExpression extends Expression {

    leftArg: Expression;

    rightArg: Expression;

}

export class OrExpression extends Expression {

    leftArg: Expression;

    rightArg: Expression;

}
