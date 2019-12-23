import { Constants } from "../../../Constants";

export abstract class ComparisonOperator {

    abstract type: string;

    abstract label: string;

}

export class EqualsOperator extends ComparisonOperator {

    type = Constants.EqualsComparisonOperator;

    label = Constants.EqualsComparisonLabel;

}

export class NotEqualsOperator extends ComparisonOperator {

    type = Constants.NotEqualsComparisonOperator;

    label = Constants.NotEqualsComparisonLabel;

}

export class GreaterThanEqualsOperator extends ComparisonOperator {

    type = Constants.GreaterThanEqualsComparisonOperator;

    label = Constants.GreaterThanEqualsComparisonLabel;

}

export class GreaterThanOperator extends ComparisonOperator {

    type = Constants.GreaterThanComparisonOperator;

    label = Constants.GreaterThanComparisonLabel;

}

export class LessThanOperator extends ComparisonOperator {

    type = Constants.LessThanComparisonOperator;

    label = Constants.LessThanComparisonLabel;

}

export class LessThanEqualsOperator implements ComparisonOperator {

    type = Constants.LessThanEqualsComparisonOperator;

    label = Constants.LessThanQualsComparisonLabel;

}


export class ExistsOperator implements ComparisonOperator {

    type = Constants.ExistsComparisonOperator;

    label = Constants.ExistsComparisonLabel;

}

export class LikeOperator implements ComparisonOperator {

    type = Constants.LikeComparisonOperator;

    label = Constants.LikeComparisonLabel;

}

export class MatchOperator implements ComparisonOperator {

    type = Constants.MatchComparisonOperator;

    label = Constants.MatchComparisonLabel;

}
