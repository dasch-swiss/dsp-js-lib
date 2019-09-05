import { JsonConvert } from "json2typescript";
import { Constants } from "./Constants";

export namespace OntologyConversionUtils {

    // Given a collection of definitions, filters out resource class definitions
    export const filterResourceClassDefinitions = (entity: { [index: string]: any }): boolean => {
        return entity.hasOwnProperty(Constants.IsResourceClass) &&
            entity[Constants.IsResourceClass] === true;
    };

    // Given a collection of definitions, filters out standoff class definitions
    export const filterStandoffClassDefinitions = (entity: { [index: string]: any }): boolean => {
        return entity.hasOwnProperty(Constants.IsStandoffClass) &&
            entity[Constants.IsStandoffClass] === true;
    };

    // Given a collection of definitions, filters out resource property definitions
    export const filterResourcePropertyDefinitions = (entity: { [index: string]: any }): boolean => {
        return entity.hasOwnProperty(Constants.IsResourceProperty) &&
            entity[Constants.IsResourceProperty] === true;
    };

    // Given a collection of definitions, filters out system property definitions
    export const filterSystemPropertyDefintions = (entity: { [index: string]: any }) => {
        return (entity["@type"] === Constants.DataTypeProperty || entity["@type"] === Constants.ObjectProperty)
            && !entity.hasOwnProperty(Constants.IsResourceProperty);
    };

    // Converts an entity to the given type
    export const convertEntity = <T>(entity: object, dataType: { new(): T }, jsonConvert: JsonConvert): T => {
        return jsonConvert.deserializeObject(entity, dataType);
    };

}
