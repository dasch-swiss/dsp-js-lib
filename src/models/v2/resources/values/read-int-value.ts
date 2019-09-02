import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';

@JsonObject('ReadIntValue')
export class ReadIntValue extends ReadValue {

    @JsonProperty(Constants.IntValueAsInt, Number)
    int: number = 0;
}
