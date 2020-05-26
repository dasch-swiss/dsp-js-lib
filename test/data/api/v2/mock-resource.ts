import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ReadResource } from "../../../../src/models/v2/resources/read/read-resource";
import { V2Endpoint } from "../../../../src/api/v2/v2-endpoint";
import { ListNodeV2Cache } from "../../../../src/cache/ListNodeV2Cache";
import { OntologyCache } from "../../../../src/cache/ontology-cache/OntologyCache";
import { KnoraApiConfig } from "../../../../src/knora-api-config";
import { ResourcesConversionUtil } from "../../../../src/models/v2/resources/ResourcesConversionUtil";
import testthing from "../v2/resources/testding-expanded.json";
import { MockList } from "./mockList";
import { MockOntology } from "./mockOntology";
import { ReadResourceSequence } from "../../../../src/models/v2/resources/read/read-resource-sequence";

export namespace MockResource {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const getTestthing = (): Observable<ReadResource> => {

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

        const resSeq: Observable<ReadResourceSequence> = ResourcesConversionUtil.createReadResourceSequence(testthing, ontoCache, listNodeCache, jsonConvert);

        return resSeq.pipe(
            map(
                (seq: ReadResourceSequence) => seq.resources[0]
            )
        );

    };

}
