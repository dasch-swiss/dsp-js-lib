import { AsyncSubject, forkJoin, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { KnoraApiConfig } from "..";
import { V2Endpoint } from "../api/v2/v2-endpoint";
import { ClassDefinition, IHasProperty } from "../models/v2/ontologies/class-definition";
import { OntologyConversionUtil } from "../models/v2/ontologies/OntologyConversionUtil";
import { PropertyDefinition } from "../models/v2/ontologies/property-definition";
import { ReadOntology } from "../models/v2/ontologies/read-ontology";
import { GenericCache } from "./GenericCache";

/**
 * Represents resource class definitions
 * and property definitions the resource classes have cardinalities for.
 */
export interface IResourceClassAndPropertyDefinitions {

    /**
     * Resource class definitions and their cardinalities.
     */
    classes: { [index: string]: ClassDefinition };

    /**
     * Property definitions referred to in cardinalities.
     */
    properties: { [index: string]: PropertyDefinition };
}

/**
 * Caches ontologies obtained from Knora and handles direct dependencies between ontologies.
 */
export class OntologyCache extends GenericCache<ReadOntology> {

    constructor(private knoraApiConfig: KnoraApiConfig, private v2Endpoint: V2Endpoint) {
        super();
    }

    /**
     * Gets an ontology from the cache including its direct dependencies.
     *
     * The ontology Iris are the keys of the resulting Map.
     *
     * @param ontologyIri the Iri of the ontology.
     * @returns the requested ontology and its direct dependencies.
     */
    getOntology(ontologyIri: string): Observable<Map<string, ReadOntology>> {

        return this.getItem(ontologyIri).pipe(
            mergeMap((ontology: ReadOntology) => {

                if (ontology.dependsOnOntologies.size > 0) {
                    // get dependencies
                    const deps: Array<AsyncSubject<ReadOntology>> = [];
                    ontology.dependsOnOntologies.forEach((depKey: string) => {
                        deps.push(this.getItem(depKey));
                    });

                    // return when all dependencies have been resolved
                    return forkJoin(deps).pipe(
                        map(ontos => {
                            const ontoMap: Map<string, ReadOntology> = new Map();

                            // combine ontology and dependencies
                            [ontology].concat(ontos).forEach(
                                (onto: ReadOntology) => {
                                    ontoMap.set(onto.id, onto);
                                }
                            );

                            return ontoMap;
                        })
                    );

                } else {
                    // no dependencies
                    const ontoMap: Map<string, ReadOntology> = new Map();

                    ontoMap.set(ontology.id, ontology);

                    return of(ontoMap);
                }
            })
        );
    }

    /**
     * Gets a resource class definition including the property definitions
     * the resource class has cardinalities for.
     *
     * This method does not return third party ontology entities, e.g., rdfs.
     *
     * @param resourceClassIri
     */
    getResourceClassDefinition(resourceClassIri: string): Observable<IResourceClassAndPropertyDefinitions> {
        const ontoIri = OntologyConversionUtil.getOntologyIriFromEntityIri(resourceClassIri, this.knoraApiConfig);

        if (ontoIri.length !== 1) throw Error("Invalid resource class Iri " + resourceClassIri);

        const ontology: Observable<Map<string, ReadOntology>> = this.getOntology(ontoIri[0]);

        return ontology.pipe(
            map(ontosMap => {

                const requestedEntityDefs: IResourceClassAndPropertyDefinitions = {
                    classes: {},
                    properties: {}
                };

                const mainOnto = ontosMap.get(ontoIri[0]);

                if (mainOnto === undefined) throw new Error("Expected ontology not found");

                if (mainOnto.classes.hasOwnProperty(resourceClassIri)) {

                    requestedEntityDefs.classes[resourceClassIri]
                        = mainOnto.classes[resourceClassIri];

                    mainOnto.classes[resourceClassIri].propertiesList.forEach(
                        (prop: IHasProperty) => {

                            const fromOntoIri = OntologyConversionUtil.getOntologyIriFromEntityIri(prop.propertyIndex, this.knoraApiConfig);

                            // only handle Knora property definitions
                            if (fromOntoIri.length === 1) {

                                const fromOnto = ontosMap.get(fromOntoIri[0]);

                                if (fromOnto === undefined) throw new Error("Expected ontology not found");

                                requestedEntityDefs.properties[prop.propertyIndex] = fromOnto.properties[prop.propertyIndex];

                            }

                        }
                    );

                }

                return requestedEntityDefs;
            })
        );

    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ReadOntology[]> {
        return this.v2Endpoint.onto.getOntology(key).pipe(
            map((onto: ReadOntology) => [onto])
        );
    }

    protected getKeyOfItem(item: ReadOntology): string {
        return item.id;
    }

    protected getDependenciesOfItem(item: ReadOntology): string[] {
        return Array.from(item.dependsOnOntologies);
    }

}
