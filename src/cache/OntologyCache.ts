import {GenericCache} from './GenericCache';
import {ApiResponseData, KnoraApiConnection, UserResponse} from '..';
import {AsyncSubject, forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {ReadOntology} from '../models/v2/ontologies/read-ontology';

export class OntologyCache extends GenericCache<ReadOntology> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    getOntology(ontologyIri: string): Observable<Map<string, ReadOntology>> {

        return this.getItem(ontologyIri).pipe(
                mergeMap((ontology: ReadOntology) => {

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
