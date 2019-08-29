import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';

@JsonObject('ReadColorValue')
export class ReadColorValue extends ReadValue {

    @JsonProperty(Constants.ColorValueAsColor, String)
    color: string = "";
}
