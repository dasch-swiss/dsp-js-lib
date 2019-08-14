import {GenericCache} from './GenericCache';
import {ApiResponseData, KnoraApiConnection, UserResponse} from '..';
import {AsyncSubject, forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {OntologyV2} from '../models/v2/ontologies/ontology-v2';

export class OntologyCache extends GenericCache<OntologyV2> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    getOntology(ontologyIri: string): Observable<OntologyV2[]> {

        return this.getItem(ontologyIri).pipe(
                mergeMap((ontology: OntologyV2) => {

                    const deps: Array<AsyncSubject<OntologyV2>> = [];
                    ontology.dependsOnOntologies.forEach((depKey: string) => {
                        deps.push(this.getItem(depKey));
                    });

                    return forkJoin(deps).pipe(
                            map(ontos => {
                                return [ontology].concat(ontos);
                            })
                    );
                })
        );

    }

    protected requestItemFromKnora(key: string): Observable<OntologyV2> {
        return this.knoraApiConnection.v2.onto.getOntology(key).pipe(
                map((onto: OntologyV2) => onto)
        );
    }

    protected getDependenciesOfItem(item: OntologyV2): string[] {
        return Array.from(item.dependsOnOntologies);
    }

}
