import {JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';

@JsonObject('ReadBooleanValue')
export class ReadBooleanValue {

    @JsonProperty('@id', String)
    id: string = '';

    @JsonProperty(Constants.KnoraApiV2 + Constants.Delimiter + 'booleanValueAsBoolean', Boolean)
    bool: boolean = false;
}
