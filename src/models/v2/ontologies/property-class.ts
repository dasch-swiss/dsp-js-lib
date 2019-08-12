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
class GuiElementConverter  implements JsonCustomConvert<string> {
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

@JsonObject("PropertyClass")
export class PropertyClass {
    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.SubPropertyOf, SubPropertyOfConverter, true)
    subPropertyOf: string[] = [];

    @JsonProperty(Constants.Comment, String, true)
    comment?: string = undefined;

    @JsonProperty(Constants.Label, String, true)
    label?: string = undefined;

    @JsonProperty(Constants.GuiElement, GuiElementConverter, true)
    guiElement?: string = undefined;
}

// tslint:disable-next-line:max-classes-per-file
/*export class SystemPropertyClass extends PropertyClass {

}*/

// tslint:disable-next-line:max-classes-per-file
/*export class ProjectPropertyClass extends PropertyClass {

}*/
