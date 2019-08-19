import {JsonConverter, JsonCustomConvert, JsonObject, JsonProperty} from 'json2typescript';
import {Constants} from '../Constants';

@JsonConverter
class SubPropertyOfConverter implements JsonCustomConvert<string[]> {
    serialize(subproperties: string[]): any {
    }

    deserialize(item: any): string[] {
        const tmp: string[] = [];

        const addItem = (ele: any) => {
            if (ele.hasOwnProperty('@id') && (typeof ele['@id'] === 'string' || ele['@id'] instanceof String)) {
                tmp.push(ele['@id']);
            }
        };

        if (Array.isArray(item)) {
            item.forEach(it => addItem(it));
        } else {
            addItem(item);
        }

        return tmp;
    }
}

@JsonConverter
class IdConverter  implements JsonCustomConvert<string> {
    serialize(description: string): any {
    }

    deserialize(item: any): string {
        let tmp = "";

        // TODO: check if it could be an array, too.
        if (item.hasOwnProperty('@id') && (typeof item['@id'] === 'string' || item['@id'] instanceof String)) {
            tmp = item['@id'];
        }

        return tmp;
    }
}

export abstract class PropertyDefinition {
    abstract id: string;

    abstract subPropertyOf: string[];

    abstract comment?: string;

    abstract label?: string;

    abstract subjectType?: string;

    abstract objectType?: string;
}

@JsonObject("ResourcePropertyDefinition")
export class ResourcePropertyDefinition extends PropertyDefinition {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.GuiElement, IdConverter, true)
    guiElement?: string = undefined;

    @JsonProperty(Constants.SubjectType, IdConverter, true)
    subjectType?: string = undefined;

    @JsonProperty(Constants.ObjectType, IdConverter, true)
    objectType?: string = undefined;
}

@JsonObject("SystemPropertyDefinition")
export class SystemPropertyDefinition extends PropertyDefinition {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.SubjectType, IdConverter, true)
    subjectType?: string = undefined;

    @JsonProperty(Constants.ObjectType, IdConverter, true)
    objectType?: string = undefined;
}
