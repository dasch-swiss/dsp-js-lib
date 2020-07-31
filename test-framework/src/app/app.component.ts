import { Component, OnInit } from "@angular/core";
import {
    ApiResponseData,
    ApiResponseError,
    Constants,
    CountQueryResponse,
    CreateBooleanValue,
    CreateIntValue,
    CreateResource,
    CreateValue,
    DeleteResource,
    DeleteValue,
    DeleteValueResponse,
    KnoraApiConfig,
    KnoraApiConnection,
    ListNodeV2,
    LoginResponse,
    OntologiesMetadata,
    ReadOntology,
    ReadResource,
    ReadResourceSequence,
    UpdateIntValue,
    UpdateResource,
    UpdateResourceMetadata,
    UpdateResourceMetadataResponse,
    UpdateValue,
    UserCache,
    UserResponse,
    UsersResponse,
    WriteValueResponse,
    DeleteResourceResponse,
    OntologyMetadata,
    MockOntology,
    MockProjects,
    MockUsers,
    CreateOntology,
    DeleteOntologyResponse,
    UpdateOntology,
    ResourceClassDefinitionWithAllLanguages,
    CreateResourceClass,
} from "@dasch-swiss/dsp-js";

import { map } from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    knoraApiConnection: KnoraApiConnection;

    userCache: UserCache;

    ontologies: Map<string, ReadOntology>;
    anythingOntologies: OntologiesMetadata;
    dokubibOntologies: OntologiesMetadata;
    ontologyMeta: OntologyMetadata;
    ontology: ReadOntology;
    resClass: ResourceClassDefinitionWithAllLanguages;

    // reusable response message
    message: string;

    resource: ReadResource;

    listNode: ListNodeV2;

    searchResult: ReadResource[];
    size: number;

    loginStatus = '';

    valueStatus = '';

    resourceStatus = '';

    itemPluralMapping = {
        ontology: {
            '=1': '1 ontology',
            other: '# ontologies'
        }
    };

    ngOnInit() {
        const config = new KnoraApiConfig('http', '0.0.0.0', 3333, undefined, undefined, true);
        this.knoraApiConnection = new KnoraApiConnection(config);
        // console.log(this.knoraApiConnection);
        this.userCache = new UserCache(this.knoraApiConnection);

    }

    login() {

        this.knoraApiConnection.v2.auth.login('username', 'root', 'test').subscribe(
            (loginResponse: ApiResponseData<LoginResponse>) => {
                console.log(loginResponse);
                this.loginStatus = 'logged in';

            },
            error => console.error(error)
        );

    }

    logout() {

        this.knoraApiConnection.v2.auth.logout().subscribe(
            logoutRes => {
                console.log(logoutRes);
                this.loginStatus = 'logged out';
            },
            error => console.error(error)
        );

    }

    getUsers() {

        this.knoraApiConnection.admin.usersEndpoint.getUsers().subscribe(
            (a: ApiResponseData<UsersResponse>) => console.log(a.body.users),
            b => console.error(b)
        );

    }

    getUser(iri: string) {
        this.userCache.getUser(iri).subscribe(
            (a: UserResponse) => console.log(a.user),
            b => console.error(b)
        );
    }

    getOntology(iri: string) {

        this.knoraApiConnection.v2.ontologyCache.getOntology(iri).subscribe(
            onto => {
                console.log('onto ', onto);
                this.ontologies = onto;
            }
        );
    }

    getAnythingOntologies() {
        this.knoraApiConnection.v2.onto.getOntologiesByProjectIri('http://rdfh.ch/projects/0001').subscribe(
            (response: OntologiesMetadata) => {
                console.log('anythingOntologies ', response);
                this.anythingOntologies = response;
            },
            (error: ApiResponseError) => {
                console.error('project ontologies error', error);
            }
        )
    }
    getDokubibOntologies() {
        this.knoraApiConnection.v2.onto.getOntologiesByProjectIri('http://rdfh.ch/projects/0804').subscribe(
            (response: OntologiesMetadata) => {
                console.log('dokubibOntologies ', response);
                this.dokubibOntologies = response;
            },
            (error: ApiResponseError) => {
                console.error('project ontologies error', error);
            }
        )
    }

    createOntology() {
        const createOntology = new CreateOntology();
        createOntology.label = 'Test Ontology';
        createOntology.name = 'testonto';
        createOntology.attachedToProject = 'http://rdfh.ch/projects/0001';
        this.knoraApiConnection.v2.onto.createOntology(createOntology).subscribe(
            (onto: OntologyMetadata) => {
                this.ontologyMeta = onto;
                console.log('new ontology created', onto);
            }
        );
    }

    getTestOnto(iri: string) {
        this.knoraApiConnection.v2.onto.getOntology(iri).subscribe(
            (onto: ReadOntology) => {
                this.ontology = onto;
                console.log('get testonto ', onto);
            }
        )
    }

    deleteOntology() {
        // 2020-06-30T08:52:10.532394Z
        const deleteOntology = new UpdateOntology();
        deleteOntology.id = this.ontology.id;
        deleteOntology.lastModificationDate = this.ontology.lastModificationDate;
        this.knoraApiConnection.v2.onto.deleteOntology(deleteOntology).subscribe(
            (response: DeleteOntologyResponse) => {
                this.message = response.result;
                console.log('ontology deleted', response);
            }
        )
    }

    createResourceClass() {
        const newResClass = new CreateResourceClass();
        newResClass.ontology = {
            id: this.ontology.id,
            lastModificationDate: this.ontology.lastModificationDate
        };
        newResClass.name = "testclass";
        newResClass.labels = [
            {
                language: "de",
                value: "Test Klasse"
            }, {
                language: "en",
                value: "Test Class"
            }
        ],
        newResClass.comments = [
            {
                language: "en",
                value: "Just an example of a new resource class"
            }
        ]
        newResClass.subClassOf = [Constants.Resource];

        this.knoraApiConnection.v2.onto.createResourceClass(newResClass).subscribe(
            (response: ResourceClassDefinitionWithAllLanguages) => {
                console.log('new resource class created', response);
                this.resClass = response;
            }
        );
    }

    deleteResourceClass() {
        const deleteResClass: UpdateOntology = new UpdateOntology();
        deleteResClass.id = "http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass";
        deleteResClass.lastModificationDate = this.ontology.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteResourceClass(deleteResClass).subscribe(
            (response: OntologyMetadata) => {
                console.warn('res class deleted', response);
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )

    }

    getResourceClass(iri: string) {

        this.knoraApiConnection.v2.ontologyCache.getResourceClassDefinition(iri).subscribe(
            onto => {
                console.log('get res class', onto);
            }
        );
    }

    getResource(iri: string) {

        this.knoraApiConnection.v2.res.getResource(iri).pipe(
            map(
                (res) => { // make sure RxJS versions (Observable) are compatible
                    return res;
                })
        ).subscribe(
            (res: ReadResource) => {
                console.log(res);
                this.resource = res;

            },
            (error) => {

            }
        );

    }

    createResource() {

        const createResource = new CreateResource();

        createResource.label = 'testding';

        createResource.type = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';

        createResource.attachedToProject = 'http://rdfh.ch/projects/0001';

        const boolVal = new CreateBooleanValue();
        boolVal.bool = true;

        const props = {
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean': [
                boolVal
            ]
        };

        createResource.properties = props;

        this.knoraApiConnection.v2.res.createResource(createResource).subscribe(
            (res: ReadResource) => {
                this.resource = res;
            }
        );

    }

    updateResourceMetadata() {

        const updateResourceMetadata = new UpdateResourceMetadata();

        updateResourceMetadata.id = 'http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw';

        updateResourceMetadata.type = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';

        updateResourceMetadata.label = 'Das Ding der Dinge';

        this.knoraApiConnection.v2.res.updateResourceMetadata(updateResourceMetadata).subscribe(
            (res: UpdateResourceMetadataResponse) => {
                this.resourceStatus = 'OK';
            }
        );
    }

    deleteResource() {

        const deleteResource = new DeleteResource();

        deleteResource.id = this.resource.id;

        deleteResource.type = this.resource.type;

        this.knoraApiConnection.v2.res.deleteResource(deleteResource).subscribe(
            (res: DeleteResourceResponse) => {
                this.resourceStatus = 'OK';
            }
        );

    }

    getListNode(listNodeIri: string) {

        this.knoraApiConnection.v2.listNodeCache.getNode(listNodeIri).subscribe(
            (res: ListNodeV2) => {
                console.log(res);

                this.listNode = res;

            }
        );
    }

    fulltextSearch(searchTerm: string) {

        this.knoraApiConnection.v2.search.doFulltextSearch(searchTerm, 0).subscribe(
            (res: ReadResourceSequence) => {
                this.searchResult = res.resources;
                this.size = res.resources.length;
            }
        );
    }

    fulltextSearchCountQuery(searchTerm: string) {

        this.knoraApiConnection.v2.search.doFulltextSearchCountQuery(searchTerm, 0).subscribe(
            (res: CountQueryResponse) => {
                console.log(res);
                this.size = res.numberOfResults;
            }
        );
    }

    labelSearch(searchTerm: string) {

        this.knoraApiConnection.v2.search.doSearchByLabel(searchTerm, 0).subscribe(
            (res: ReadResourceSequence) => {
                console.log(res);
                this.searchResult = res.resources;
                this.size = res.resources.length;
            }
        );
    }

    extendedSearch() {

        const gravsearchQuery = `
                PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
                CONSTRUCT {

                    ?mainRes knora-api:isMainResource true .

                } WHERE {

                    ?mainRes a knora-api:Resource .

                    ?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/v2#Thing> .
                }

                OFFSET 0
            `;

        this.knoraApiConnection.v2.search.doExtendedSearch(gravsearchQuery).subscribe(
            (res: ReadResourceSequence) => {
                console.log(res);
                this.searchResult = res.resources;
                this.size = res.resources.length;
            }
        );
    }

    extendedSearchCountQuery() {

        const gravsearchQuery = `
                PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
                CONSTRUCT {

                    ?mainRes knora-api:isMainResource true .

                } WHERE {

                    ?mainRes a knora-api:Resource .

                    ?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/v2#Thing> .
                }

                OFFSET 0
            `;

        this.knoraApiConnection.v2.search.doExtendedSearchCountQuery(gravsearchQuery).subscribe(
            (res: CountQueryResponse) => {
                console.log(res);
                this.size = res.numberOfResults;
            }
        );
    }

    generateUpdateIntValue(int: number): UpdateResource<UpdateValue> {
        const updateIntVal = new UpdateIntValue();

        updateIntVal.id = 'http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/dJ1ES8QTQNepFKF5-EAqdg';
        updateIntVal.int = int;

        const updateResource: UpdateResource<UpdateValue> = new UpdateResource<UpdateValue>();

        updateResource.id = 'http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw';
        updateResource.type = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';
        updateResource.property = 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger';
        updateResource.value = updateIntVal;

        return updateResource;
    }

    updateValue(updateResource: UpdateResource<UpdateValue>) {

        this.knoraApiConnection.v2.values.updateValue(updateResource).subscribe((res: WriteValueResponse) => {
            console.log(res);
            this.valueStatus = 'OK';
        },
            error => {
                this.valueStatus = '';
            }
        );

    }

    generateCreateIntValue(int: number): UpdateResource<CreateValue> {
        const createIntVal = new CreateIntValue();
        createIntVal.int = int;

        const updateResource: UpdateResource<CreateValue> = new UpdateResource<CreateValue>();

        updateResource.id = 'http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw';
        updateResource.type = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';
        updateResource.property = 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger';
        updateResource.value = createIntVal;

        return updateResource;
    }

    createValue(updateResource: UpdateResource<CreateValue>) {

        this.knoraApiConnection.v2.values.createValue(updateResource).subscribe((res: WriteValueResponse) => {
            console.log(res);
            this.valueStatus = 'OK';
        },
            error => {
                this.valueStatus = '';
            }
        );

    }

    deleteValue() {

        const deleteVal = new DeleteValue();

        deleteVal.id = 'http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw/values/bXMwnrHvQH2DMjOFrGmNzg';
        deleteVal.type = Constants.DecimalValue;

        const updateResource: UpdateResource<DeleteValue> = new UpdateResource<DeleteValue>();

        updateResource.id = 'http://rdfh.ch/0001/H6gBWUuJSuuO-CilHV8kQw';
        updateResource.type = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';
        updateResource.property = 'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal';
        updateResource.value = deleteVal;

        this.knoraApiConnection.v2.values.deleteValue(updateResource).subscribe((res: DeleteValueResponse) => {
            console.log(res);
            this.valueStatus = 'OK';
        },
            error => {
                this.valueStatus = '';
            }
        );
    }

    getValue(resourceIri: string, valueUuid: string) {

        this.knoraApiConnection.v2.values.getValue(resourceIri, valueUuid).subscribe(
            (res: ReadResource) => {
                console.log(res);
                this.valueStatus = 'OK';
            },
            error => {
                this.valueStatus = '';
            }
        );

    }

}
