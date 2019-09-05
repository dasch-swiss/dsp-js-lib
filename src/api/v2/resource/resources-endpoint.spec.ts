import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { of } from "rxjs";
import { OntologyCache } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { IResourceClassAndPropertyDefinitions } from "../../../cache/OntologyCache";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { ResourceClassDefinition } from "../../../models/v2/ontologies/resource-class-definition";
import { ResourcePropertyDefinition } from "../../../models/v2/ontologies/resource-property-definition";
import { SystemPropertyDefinition } from "../../../models/v2/ontologies/system-property-definition";
import { OntologyConversionUtils } from "../../../models/v2/OntologyConversionUtil";
import { ReadResource } from "../../../models/v2/resources/read-resource";

describe("ResourcesEndpoint", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, undefined, "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    const ontoCache = new OntologyCache(knoraApiConnection, config);

    let getResourceClassSpy: jasmine.Spy;

    beforeEach(() => {

        jasmine.Ajax.install();

        getResourceClassSpy = spyOn(ontoCache, "getResourceClassDefinition").and.callFake(
            (resClassIri: string) => {
                return of(createEntityMock(resClassIri));
            }
        );
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it("should return a resource", done => {

        knoraApiConnection.v2.res.getResource("http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw", ontoCache).subscribe((response: ReadResource[]) => {
            /*response[0].properties.forEach(
                    prop => console.log(prop)
            );*/

            expect(response.length).toEqual(1);
            expect(response[0].resourceClassLabel).toEqual("Thing");

            expect(getResourceClassSpy).toHaveBeenCalledTimes(2);
            expect(getResourceClassSpy).toHaveBeenCalledWith("http://api.dasch.swiss/ontology/0001/anything/v2#Thing");

            // console.log(response[0].properties);

            done();
        });

        const request = jasmine.Ajax.requests.mostRecent();

        const onto = require("../../../../test/data/api/v2/resources/testding.json");

        request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(onto)));

        expect(request.url).toBe("http://api.dasch.swiss/v2/resources/http%3A%2F%2Frdfh.ch%2F0001%2FH6gBWUuJSuuO-CilHV8kQw");

        expect(request.method).toEqual("GET");

    });

});

const createEntityMock = (resClassIri: string): IResourceClassAndPropertyDefinitions => {

    const entityMock: IResourceClassAndPropertyDefinitions = {
        classes: {},
        properties: {}
    };

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    const anythingOntology = require("../../../../test/data/api/v2/ontologies/anything-ontology-expanded.json");
    const knoraApiOntology = require("../../../../test/data/api/v2/ontologies/knora-api-ontology-expanded.json");

    const knoraApiEntities = (knoraApiOntology as { [index: string]: object[] })["@graph"];
    const anythingEntities = (anythingOntology as { [index: string]: object[] })["@graph"];

    const entities = knoraApiEntities.concat(anythingEntities);

    // this.jsonConvert.operationMode = OperationMode.LOGGING;

    // Convert resource classes
    entities.filter(OntologyConversionUtils.filterResourceClassDefinitions)
        .map(resclassJsonld => OntologyConversionUtils.convertEntity(resclassJsonld, ResourceClassDefinition, jsonConvert))
        .filter(resclassDef => resclassDef.id === resClassIri)
        .forEach((resClass: ResourceClassDefinition) => {
            entityMock.classes[resClass.id] = resClass;
        });

    // properties of anything Thing
    const props: string[]
        = entityMock.classes[resClassIri].propertiesList.map(prop => prop.propertyIndex);

    // Convert resource properties (properties pointing to Knora values)
    entities.filter(OntologyConversionUtils.filterResourcePropertyDefinitions)
        .map((propertyJsonld: any) => {
            return OntologyConversionUtils.convertEntity(propertyJsonld, ResourcePropertyDefinition, jsonConvert);
        }).filter(propertyDef => props.indexOf(propertyDef.id) !== -1)
        .forEach((prop: ResourcePropertyDefinition) => {
            entityMock.properties[prop.id] = prop;
        });

    // Convert system properties (properties not pointing to Knora values)
    entities.filter(OntologyConversionUtils.filterSystemPropertyDefintions)
        .map((propertyJsonld: any) => {
            return OntologyConversionUtils.convertEntity(propertyJsonld, SystemPropertyDefinition, jsonConvert);
        }).filter(propertyDef => props.indexOf(propertyDef.id) !== -1)
        .forEach((prop: SystemPropertyDefinition) => {
            entityMock.properties[prop.id] = prop;
        });

    return entityMock;

};
