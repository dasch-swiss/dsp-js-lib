import {GenericCache} from './GenericCache';
import {ApiResponseData, KnoraApiConnection, UserResponse} from '..';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OntologyV2} from '../models/v2/ontologies/ontology-v2';

export class OntologyCache extends GenericCache<OntologyV2> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
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
