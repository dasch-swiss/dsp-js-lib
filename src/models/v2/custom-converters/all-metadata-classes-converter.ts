import { Any, JsonConvert, JsonCustomConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Constants } from "../Constants";
import { Person } from "../project-metadata/person-definition";
import { Dataset } from "../project-metadata/project-metadata";

export class AllMetadataClassesConverter implements JsonCustomConvert<any> {

    static jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    serialize(obj: Any): any {
        return;
    }

    deserialize(val: any): any {
        console.log('ALLPROPS', val);
        for (let el of val["@graph"]) {
            if (el.hasOwnProperty("@type")) {
                const propType = el["@type"];
                switch (propType) {
                    case "http://ns.dasch.swiss/repository#Person":
                        return AllMetadataClassesConverter.jsonConvert.deserializeObject(el, Person);
                        break;
                    case "http://ns.dasch.swiss/repository#Dataset":
                        return AllMetadataClassesConverter.jsonConvert.deserializeObject(el, Dataset);
                        break;
                    
                }
            }
        }
    }
}