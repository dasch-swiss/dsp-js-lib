import {JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';

@JsonObject('BooleanValue')
export class BooleanValue {

    @JsonProperty('@id', String)
    id: string = '';

    @JsonProperty(Constants.KnoraApiV2 + Constants.Delimiter + 'booleanValueAsBoolean', Boolean)
    bool: boolean = false;
}
