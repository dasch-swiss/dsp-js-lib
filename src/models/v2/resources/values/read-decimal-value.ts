import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';
import {DecimalConverter} from '../../CustomConverters';

@JsonObject('ReadDecimalValue')
export class ReadDecimalValue extends ReadValue {

    @JsonProperty(Constants.DecimalValueAsDecimal, DecimalConverter)
    int: number = 0;
}
