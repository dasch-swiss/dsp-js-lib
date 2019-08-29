import {JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';
import {IdConverter, UriConverter} from '../CustomConverters';
import {ReadValue} from './read-value';

@JsonObject('ReadResource')
export class ReadResource {

    @JsonProperty('@id', String)
    id: string = '';

    @JsonProperty('@type', String)
    type: string = '';

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.AttachedToProject, IdConverter)
    attachedToProject: string = "";

    @JsonProperty(Constants.AttachedToUser, IdConverter)
    attachedToUser: string = "";

    @JsonProperty(Constants.ArkUrl, UriConverter)
    arkUrl: string = "";

    @JsonProperty(Constants.VersionArkUrl, UriConverter)
    versionArkUrl: string = "";

    resourceClassLabel?: string;

    resourceClassComment?: string;

    properties: ReadValue[] = [];

}
