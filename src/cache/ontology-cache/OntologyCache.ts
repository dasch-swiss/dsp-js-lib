import { AsyncSubject, forkJoin, Observable, of } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { V2Endpoint } from "../../api/v2/v2-endpoint";
import { KnoraApiConfig } from "../../knora-api-config";
import { IHasProperty } from "../../models/v2/ontologies/class-definition";
import { OntologyConversionUtil } from "../../models/v2/ontologies/OntologyConversionUtil";
import { PropertyDefinition } from "../../models/v2/ontologies/property-definition";
import { ReadOntology } from "../../models/v2/ontologies/read/read-ontology";
import { ResourceClassDefinition } from "../../models/v2/ontologies/resource-class-definition";
import { GenericCache } from "../GenericCache";
import { ResourceClassAndPropertyDefinitions } from "./resource-class-and-property-definitions";
import { ResourceClassDefinitionWithPropertyDefinition } from "./resource-class-definition-with-property-definition";

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
    getResourceClassDefinition(resourceClassIri: string): Observable<ResourceClassAndPropertyDefinitions> {
        const ontoIri = OntologyConversionUtil.getOntologyIriFromEntityIri(resourceClassIri, this.knoraApiConfig);

        if (ontoIri.length !== 1) throw Error("Invalid resource class Iri " + resourceClassIri);

        const ontology: Observable<Map<string, ReadOntology>> = this.getOntology(ontoIri[0]);

        return ontology.pipe(
            map(ontosMap => {

                const mainOnto = ontosMap.get(ontoIri[0]);

                if (mainOnto === undefined) throw new Error("Expected ontology not found");

                if (mainOnto.classes.hasOwnProperty(resourceClassIri) && mainOnto.classes[resourceClassIri] instanceof ResourceClassDefinition) {

                    const tmpClasses: { [index: string]: ResourceClassDefinition } = {};

                    const tmpProps: { [index: string]: PropertyDefinition } = {};

                    tmpClasses[resourceClassIri]
                        = mainOnto.classes[resourceClassIri] as ResourceClassDefinition;

                    // filter out non Knora properties
                    tmpClasses[resourceClassIri].propertiesList = tmpClasses[resourceClassIri].propertiesList.filter(
                        (hasProp: IHasProperty) => {
                            return OntologyConversionUtil.getOntologyIriFromEntityIri(hasProp.propertyIndex, this.knoraApiConfig).length === 1;
                        }
                    );

                    tmpClasses[resourceClassIri].propertiesList.forEach(
                        (prop: IHasProperty) => {

                            // prop could refer to entities in the ontology the requested resource class belongs to
                            // or to other ontologies the resource class has prop cardinalities for, e.g. knora api or another project ontology.
                            const fromOntoIri = OntologyConversionUtil.getOntologyIriFromEntityIri(prop.propertyIndex, this.knoraApiConfig);

                            if (fromOntoIri.length === 1) {

                                const fromOnto = ontosMap.get(fromOntoIri[0]);

                                if (fromOnto === undefined) throw new Error("Expected ontology not found");
                                tmpProps[prop.propertyIndex] = fromOnto.properties[prop.propertyIndex];

                            }
                        }
                    );

                    return new ResourceClassAndPropertyDefinitions(
                        {[resourceClassIri]: new ResourceClassDefinitionWithPropertyDefinition(tmpClasses[resourceClassIri], tmpProps)},
                        tmpProps
                        );

                } else {
                    // resource class not found
                    // TODO: Should an error be thrown?
                    return new ResourceClassAndPropertyDefinitions({}, {});
                }

            })
        );

    }

    /**
     * Given a resource class Iri, returns all super class Iris in ascending order,
     * starting with the resource class Iri.
     *
     * @param resourceClassIri the Iri of the resource class whose super class Iris should be determined.
     */
    getSuperClassIris(resourceClassIri: string): Observable<string[]> {

        const getSuperClassDef = (onto: ResourceClassDefinitionWithPropertyDefinition, superClassIri?: string): Observable<ResourceClassDefinitionWithPropertyDefinition[]> => {

            // check if superclass is given
            if (superClassIri) {
                return this.getResourceClassDefinition(superClassIri).pipe(
                    mergeMap(
                        onto2 => {

                            const superDefs = getSuperClassDef(onto2.classes[superClassIri], onto2.classes[superClassIri].subClassOf[0]);

                            return forkJoin([of(onto), superDefs])
                                .pipe(
                                    map(
                                        defs => {
                                            // console.log("1 returning from getSuperClassDef", superClassIri, defs);
                                            return defs.reduce(
                                                (acc: ResourceClassDefinitionWithPropertyDefinition[], curVal: ResourceClassDefinitionWithPropertyDefinition | ResourceClassDefinitionWithPropertyDefinition[]) =>
                                                    acc.concat(curVal) as ResourceClassDefinitionWithPropertyDefinition[],
                                                []
                                            ) as ResourceClassDefinitionWithPropertyDefinition[];
                                        }
                                    ),
                                    tap(
                                        defs => {
                                            console.log("2 returning from getSuperClassDef", superClassIri, defs);
                                        }
                                    )
                                );
                        }
                    )
                );
            } else {
                return of([onto]);
            }

        };

        return this.getResourceClassDefinition(resourceClassIri)
            .pipe(
                mergeMap(onto => {
                    return getSuperClassDef(onto.classes[resourceClassIri], onto.classes[resourceClassIri].subClassOf[0]);
                }),
                map((defs: ResourceClassDefinitionWithPropertyDefinition[]) => defs.map((def: ResourceClassDefinitionWithPropertyDefinition) => def.id))
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
