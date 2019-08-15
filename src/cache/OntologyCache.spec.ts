import {KnoraApiConfig} from '../knora-api-config';
import {KnoraApiConnection} from '../knora-api-connection';
import {UserCache} from './UserCache';
import {OntologyCache, UserResponse} from '..';
import {of} from 'rxjs';
import {OntologyV2} from '../models/v2/ontologies/ontology-v2';

describe('OntologyCache', () => {

    const config = new KnoraApiConfig('http', 'localhost', 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    describe('Method getItem', () => {

        let getOntoSpy: jasmine.Spy;
        let ontoCache: OntologyCache;

        beforeEach(() => {

            getOntoSpy = spyOn(knoraApiConnection.v2.onto, 'getOntology').and.callFake(
                    (ontoIri: string) => {

                        const ontoResp = new OntologyV2(ontoIri);
                        ontoResp.dependsOnOntologies = new Set();

                        return of(ontoResp);
                    }
            );

            ontoCache = new OntologyCache(knoraApiConnection);

        });

        it('should get an ontology from the cache', done => {

            ontoCache['getItem']('http://api.knora.org/ontology/knora-api/v2').subscribe((onto: OntologyV2) => {

                expect(onto.id).toEqual('http://api.knora.org/ontology/knora-api/v2');
                expect(getOntoSpy).toHaveBeenCalledTimes(1);

                expect(ontoCache['cache']['http://api.knora.org/ontology/knora-api/v2']).not.toBeUndefined();
                done();

            });
        });

    });

});
