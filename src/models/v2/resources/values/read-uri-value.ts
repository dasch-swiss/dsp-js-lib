import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';
import {UriConverter} from '../../CustomConverters';

@JsonObject('ReadUriValue')
export class ReadUriValue extends ReadValue {

    @JsonProperty(Constants.UriValueAsUri, UriConverter)
    uri: string = "";
}
