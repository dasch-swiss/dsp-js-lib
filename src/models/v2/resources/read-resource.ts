import {JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';

@JsonObject('ReadResource')
export class ReadResource {

    @JsonProperty('@id', String)
    id: string = '';

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    resourceClassLabel?: string;

    resourceClassComment?: string;

    properties: any;

}
