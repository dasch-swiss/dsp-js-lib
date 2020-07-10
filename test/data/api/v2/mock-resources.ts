import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { V2Endpoint } from "../../../../src/api/v2/v2-endpoint";
import { ListNodeV2Cache } from "../../../../src/cache/ListNodeV2Cache";
import { OntologyCache } from "../../../../src/cache/ontology-cache/OntologyCache";
import { KnoraApiConfig } from "../../../../src/knora-api-config";
import { ReadResourceSequence } from "../../../../src/models/v2/resources/read/read-resource-sequence";
import { ResourcesConversionUtil } from "../../../../src/models/v2/resources/ResourcesConversionUtil";
import testthings from "../v2/resources/things-expanded.json";
import { MockList } from "./mock-list";
import { MockOntology } from "./mock-ontology";

export namespace MockResources {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const getTestthings = (): Observable<ReadResourceSequence> => {

        const config = new KnoraApiConfig("http", "");

        const v2Endpoint = new V2Endpoint(config, "");

        const ontoCache = new OntologyCache(config, v2Endpoint);

        const listNodeCache = new ListNodeV2Cache(v2Endpoint);

        // replace actual cache methods with class to exiting mock factories

        // use ontology mock factory
        ontoCache.getResourceClassDefinition = (resClassIri: string) => {

            const mock = MockOntology.mockIResourceClassAndPropertyDefinitions(resClassIri);

            return of(mock);
        };

        // use list node mock factory
        listNodeCache.getNode = (listNodeIri: string) => {

            return MockList.mockCompletedAsyncSubject(listNodeIri);

        };

        const resSeq: Observable<ReadResourceSequence> = ResourcesConversionUtil.createReadResourceSequence(testthings, ontoCache, listNodeCache, jsonConvert);

        return resSeq.pipe(
            map(
                (seq: ReadResourceSequence) => seq
            )
        );

    };

}
