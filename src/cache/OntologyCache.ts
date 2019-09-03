import {GenericCache} from './GenericCache';
import {ApiResponseData, KnoraApiConnection, UserResponse} from '..';
import {AsyncSubject, forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {ReadOntology} from '../models/v2/ontologies/read-ontology';
import {PropertyDefinition} from '../models/v2/ontologies/property-definition';
import {ClassDefinition, IHasProperty} from '../models/v2/ontologies/class-definition';

export interface IEntityDefinitions {
    classes: { [index: string]: ClassDefinition };
    properties: { [index: string]: PropertyDefinition };
}

export class OntologyCache extends GenericCache<ReadOntology> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    getOntology(ontologyIri: string): Observable<Map<string, ReadOntology>> {

        return this.getItem(ontologyIri).pipe(
                mergeMap((ontology: ReadOntology) => {

                    if (ontology.dependsOnOntologies.size > 0) {

                        const deps: Array<AsyncSubject<ReadOntology>> = [];
                        ontology.dependsOnOntologies.forEach((depKey: string) => {
                            deps.push(this.getItem(depKey));
                        });

                        return forkJoin(deps).pipe(
                                map(ontos => {
                                    const ontoMap: Map<string, ReadOntology> = new Map();

                                    [ontology].concat(ontos).forEach(
                                            (onto: ReadOntology) => {
                                                ontoMap.set(onto.id, onto);
                                            }
                                    );


                                    return ontoMap;
                                })
                        );

                    } else {
                        const ontoMap: Map<string, ReadOntology> = new Map();

                        return of(ontology).pipe(
                                map(
                                        onto => {
                                            ontoMap.set(onto.id, onto);
                                            return ontoMap;
                                        }
                                )
                        );
                    }
                })
        );

    }

    getResourceClass(resourceClassIri: string): Observable<IEntityDefinitions> {
        const ontoIri = this.knoraApiConnection.v2.onto.getOntologyIriFromEntityIri(resourceClassIri);

        if (ontoIri.length !== 1) throw Error('Invalid resource class Iri ' + resourceClassIri);

        const ontology: Observable<Map<string, ReadOntology>> = this.getOntology(ontoIri[0]);

        return ontology.pipe(
                map(ontosMap => {

                    const requestedEntityDefs: IEntityDefinitions = {
                        classes: {},
                        properties: {}
                    };

                    const mainOnto = ontosMap.get(ontoIri[0]);

                    if (mainOnto !== undefined && mainOnto.classes.hasOwnProperty(resourceClassIri)) {

                        requestedEntityDefs.classes[resourceClassIri]
                                = mainOnto.classes[resourceClassIri];

                        mainOnto.classes[resourceClassIri].propertiesList.forEach(
                                (prop: IHasProperty) => {

                                    const fromOntoIri = this.knoraApiConnection.v2.onto.getOntologyIriFromEntityIri(prop.propertyIndex);

                                    // only handle Knora property definitions
                                    if (fromOntoIri.length === 1) {

                                        const fromOnto = ontosMap.get(fromOntoIri[0]);

                                        if (fromOnto !== undefined) {
                                            requestedEntityDefs.properties[prop.propertyIndex] = fromOnto.properties[prop.propertyIndex];
                                        }

                                    }

                                }
                        );


                    }

                    return requestedEntityDefs;
                })
        );

    }

    protected requestItemFromKnora(key: string): Observable<ReadOntology> {
        return this.knoraApiConnection.v2.onto.getOntology(key).pipe(
                map((onto: ReadOntology) => onto)
        );
    }

    protected getDependenciesOfItem(item: ReadOntology): string[] {
        return Array.from(item.dependsOnOntologies);
    }

}
