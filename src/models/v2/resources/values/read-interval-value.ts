import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';
import {DecimalConverter} from '../../CustomConverters';

@JsonObject('ReadDecimalValue')
export class ReadIntervalValue extends ReadValue {

    @JsonProperty(Constants.IntervalValueHasStart, DecimalConverter)
    start: number = 0;

    @JsonProperty(Constants.IntervalValueHasEnd, DecimalConverter)
    end: number = 0;
}