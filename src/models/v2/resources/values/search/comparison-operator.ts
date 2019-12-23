import { Constants } from "../../../Constants";

export abstract class ComparisonOperator {

    abstract type: string;

    abstract label: string;

}

export class Equals extends ComparisonOperator {

    type = Constants.EqualsComparisonOperator;

    label = Constants.EqualsComparisonLabel;

}

export class NotEquals extends ComparisonOperator {

    type = Constants.NotEqualsComparisonOperator;

    label = Constants.NotEqualsComparisonLabel;

}

export class GreaterThanEquals extends ComparisonOperator {

    type = Constants.GreaterThanEqualsComparisonOperator;

    label = Constants.GreaterThanEqualsComparisonLabel;

}

export class GreaterThan extends ComparisonOperator {

    type = Constants.GreaterThanComparisonOperator;

    label = Constants.GreaterThanComparisonLabel;

}

export class LessThan extends ComparisonOperator {

    type = Constants.LessThanComparisonOperator;

    label = Constants.LessThanComparisonLabel;

}

export class LessThanEquals implements ComparisonOperator {

    type = Constants.LessThanEqualsComparisonOperator;

    label = Constants.LessThanQualsComparisonLabel;

}


export class Exists implements ComparisonOperator {

    type = Constants.ExistsComparisonOperator;

    label = Constants.ExistsComparisonLabel;

}

export class Like implements ComparisonOperator {

    type = Constants.LikeComparisonOperator;

    label = Constants.LikeComparisonLabel;

}

export class Match implements ComparisonOperator {

    type = Constants.MatchComparisonOperator;

    label = Constants.MatchComparisonLabel;

}
