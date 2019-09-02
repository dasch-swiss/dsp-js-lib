import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';
import {IdConverter} from '../../CustomConverters';

@JsonObject('ReadListValue')
export class ReadListValue extends ReadValue {

    @JsonProperty(Constants.ListValueAsListNode, IdConverter)
    listNode: string = "";
}
