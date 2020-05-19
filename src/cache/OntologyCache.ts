import { AsyncSubject, forkJoin, Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { V2Endpoint } from "../api/v2/v2-endpoint";
import { KnoraApiConfig } from "../knora-api-config";
import { IHasProperty } from "../models/v2/ontologies/class-definition";
import { OntologyConversionUtil } from "../models/v2/ontologies/OntologyConversionUtil";
import { PropertyDefinition } from "../models/v2/ontologies/property-definition";
import { ReadOntology } from "../models/v2/ontologies/read-ontology";
import { ResourceClassDefinition } from "../models/v2/ontologies/resource-class-definition";
import { GenericCache } from "./GenericCache";

/**
 * Represents a resource class definition containing all property definitions it has cardinalities for.
 */
export class ResourceClassDefinitionWithPropertyDefinition extends ResourceClassDefinition {

    propertiesList: IHasPropertyWithPropertyDefinition[];

    /**
     * Create an instance from a given `ResourceClassDefinition`.
     *
     * @param resClassDef instance of `ResourceClassDefinition`.
     * @param propertyDefinitions object containing all `PropertyDefinition`
     *                            the resource class definition has cardinalities for.
     */
    constructor(resClassDef: ResourceClassDefinition, propertyDefinitions: { [index: string]: PropertyDefinition }) {
        super();

        this.id = resClassDef.id;
        this.label = resClassDef.label;
        this.comment = resClassDef.comment;
        this.subClassOf = resClassDef.subClassOf;

        // add property definition to properties list's items
        this.propertiesList = resClassDef.propertiesList.map((prop: IHasProperty) => {

            if (propertyDefinitions[prop.propertyIndex] === undefined) {
                throw Error(`Expected key ${prop.propertyIndex} in property definitions.`);
            }

            const propInfo: IHasPropertyWithPropertyDefinition = {
                propertyIndex: prop.propertyIndex,
                cardinality: prop.cardinality,
                guiOrder: prop.guiOrder,
                isInherited: prop.isInherited,
                propertyDefinition: propertyDefinitions[prop.propertyIndex]
            };
            return propInfo;
        });
    }
}

/**
 * Represents a property defined on a resource class including the property definition.
 */
export interface IHasPropertyWithPropertyDefinition extends IHasProperty {

    propertyDefinition: PropertyDefinition;
}

/**
 * Represents resource class definitions
 * and property definitions the resource classes have cardinalities for.
 */
export interface IResourceClassAndPropertyDefinitions {

    /**
     * Resource class definitions and their cardinalities.
     */
    classes: { [index: string]: ResourceClassDefinitionWithPropertyDefinition };

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

                const mainOnto = ontosMap.get(ontoIri[0]);

                if (mainOnto === undefined) throw new Error("Expected ontology not found");

                const requestedEntityDefs: IResourceClassAndPropertyDefinitions = {
                    classes: {},
                    properties: {}
                };

                if (mainOnto.classes.hasOwnProperty(resourceClassIri) && mainOnto.classes[resourceClassIri] instanceof ResourceClassDefinition) {

                    const tmpClasses: { [index: string]: ResourceClassDefinition } = {};

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
                                requestedEntityDefs.properties[prop.propertyIndex] = fromOnto.properties[prop.propertyIndex];

                            }
                        }
                    );

                    requestedEntityDefs.classes[resourceClassIri]
                        = new ResourceClassDefinitionWithPropertyDefinition(tmpClasses[resourceClassIri], requestedEntityDefs.properties);

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
