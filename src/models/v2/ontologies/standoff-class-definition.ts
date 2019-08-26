import {JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';
import {ClassDefinition, IHasProperty, PropertiesListConverter, SubClassOfConverter} from './class-definition';

@JsonObject('StandoffClassDefinition')
export class StandoffClassDefinition extends ClassDefinition {

    @JsonProperty('@id', String)
    id: string = '';

    @JsonProperty(Constants.SubClassOf, SubClassOfConverter)
    subClassOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.SubClassOf, PropertiesListConverter)
    propertiesList: IHasProperty[] = [];
}
