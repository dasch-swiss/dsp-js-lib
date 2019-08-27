import {JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';
import {ReadValue} from './read-value';

@JsonObject('ReadBooleanValue')
export class ReadBooleanValue extends ReadValue {

    @JsonProperty('@id', String)
    id: string = '';

    @JsonProperty(Constants.KnoraApiV2 + Constants.Delimiter + 'booleanValueAsBoolean', Boolean)
    bool: boolean = false;
}
