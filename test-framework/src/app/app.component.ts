import { Component, OnInit } from "@angular/core";
import {
    ApiResponseData,
    ApiResponseError,
    Constants,
    CountQueryResponse,
    CreateBooleanValue,
    CreateIntValue,
    CreateOntology,
    CreateResource,
    CreateResourceClass,
    CreateValue,
    DeleteOntologyResponse,
    DeleteResource,
    DeleteResourceResponse,
    DeleteValue,
    DeleteValueResponse,
    KnoraApiConfig,
    KnoraApiConnection,
    ListNodeV2,
    LoginResponse,
    OntologiesMetadata,
    OntologyMetadata,
    ReadOntology,
    ReadResource,
    ReadResourceSequence,
    ResourceClassDefinitionWithAllLanguages,
    UpdateIntValue,
    UpdateOntology,
    UpdateResource,
    UpdateResourceMetadata,
    UpdateResourceMetadataResponse,
    UpdateValue,
    UserCache,
    UserResponse,
    UsersResponse,
    WriteValueResponse,
    Cardinality,
    DeleteOntology,
    DeleteResourceClass,
    DeleteResourceProperty,
    UpdateOntologyResourceClassCardinality,
    CreatePermission,
    CreateAdministrativePermission,
    ResourcePropertyDefinitionWithAllLanguages,
    CreateResourceProperty,
    CreateDefaultObjectAccessPermission,
    AdministrativePermissionResponse,
    DefaultObjectAccessPermissionsResponse,
    DefaultObjectAccessPermissionResponse,
    ProjectPermissionsResponse,
    AdministrativePermissionsResponse,
    Dataset,
    UpdateProjectMetadataResponse
} from "@dasch-swiss/dsp-js";
import { ProjectsMetadata } from '@dasch-swiss/dsp-js/src/models/v2/project-metadata/project-metadata';
import { Observable } from "rxjs";

import { map, tap } from "rxjs/operators";
import metadataPayload from "../assets/metadata-payload.json";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    knoraApiConnection: KnoraApiConnection;

    userCache: UserCache;

    healthState: Observable<any>;

    ontologies: Map<string, ReadOntology>;
    anythingOntologies: OntologiesMetadata;
    dokubibOntologies: OntologiesMetadata;
    ontologyMeta: OntologyMetadata;
    ontology: ReadOntology;
    resClass: ResourceClassDefinitionWithAllLanguages;
    property: ResourcePropertyDefinitionWithAllLanguages;
    addCard: ResourceClassDefinitionWithAllLanguages;
    permissionStatus: string;

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

    projectMetaStatus = '';

    ngOnInit() {
        const config = new KnoraApiConfig('http', '0.0.0.0', 3333, undefined, undefined, true);
        this.knoraApiConnection = new KnoraApiConnection(config);
        // console.log(this.knoraApiConnection);
        this.userCache = new UserCache(this.knoraApiConnection);

        this.getHealthStatus();

    }

    getHealthStatus() {
        this.healthState =
            this.knoraApiConnection.system.healthEndpoint.getHealthStatus().pipe(
                tap(
                    res => console.log(res)
                ),
                map(
                    res => {
                        if (res instanceof ApiResponseData) {
                            return res.body;
                        } else {
                            return res;
                        }
                    }
                )
            );

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

    getPermissions() {

        this.knoraApiConnection.admin.permissionsEndpoint.getProjectPermissions("http://rdfh.ch/projects/0001").subscribe(
            (response: ApiResponseData<ProjectPermissionsResponse>) => {
                this.permissionStatus = "getPermissions ok";
                console.log(response);
            },
            err => console.error("Error:", err)
        );
    }

    getAdministrativePermission() {

        this.knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermission("http://rdfh.ch/projects/0001", "http://www.knora.org/ontology/knora-admin#ProjectMember").subscribe(
            (response: ApiResponseData<AdministrativePermissionResponse>) => {
                this.permissionStatus = "getAdministrativePermission ok";
                console.log(response);
            },
            err => console.error("Error:", err)
        );

    }

    getAdministrativePermissions() {

        this.knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermissions("http://rdfh.ch/projects/0001").subscribe(
            (response: ApiResponseData<AdministrativePermissionsResponse>) => {
                this.permissionStatus = "getAdministrativePermissions ok";
                console.log(response);
            },
            err => console.error("Error:", err)
        );

    }

    createAdministrativePermission() {

        const permission = new CreatePermission();
        permission.name = "ProjectAdminGroupAllPermission";
        permission.additionalInformation = null;
        permission.permissionCode = null;

        const permission2 = new CreatePermission();
        permission2.name = "ProjectAdminAllPermission";
        permission2.additionalInformation = null;
        permission2.permissionCode = null;

        const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
        const projectIri = "http://rdfh.ch/projects/0001";

        const adminPermission = new CreateAdministrativePermission();
        adminPermission.forGroup = groupIri;
        adminPermission.forProject = projectIri;

        adminPermission.hasPermissions = [permission, permission2];

        // console.log(this.knoraApiConnection.admin.jsonConvert.serializeObject(permission))

        this.knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission).subscribe(
            (res: ApiResponseData<AdministrativePermissionResponse>) => {
                this.permissionStatus = "createAdministrativePermission ok";
                console.log(res);
            },
            err => console.error(err)
        )

    }

    getDefaultObjectAccessPermissions() {

        const projectIri = "http://rdfh.ch/projects/0001";

        this.knoraApiConnection.admin.permissionsEndpoint.getDefaultObjectAccessPermissions(projectIri).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionsResponse>) => {
                this.permissionStatus = "getDefaultObjectAccessPermissions ok";
                console.log(res);
            },
            err => console.error("Error:", err)
        );
    }

    createDefaultObjectAccessPermission() {

        const permission = new CreatePermission();
        permission.name = "D";
        permission.permissionCode = 7;
        permission.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";

        const permission2 = new CreatePermission();
        permission2.name = "D";
        permission2.permissionCode = 7;
        permission2.additionalInformation = "http://www.knora.org/ontology/knora-admin#KnownUser";

        const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
        const projectIri = "http://rdfh.ch/projects/0001";

        const adminPermission = new CreateDefaultObjectAccessPermission();
        adminPermission.forGroup = groupIri;
        adminPermission.forProject = projectIri;

        adminPermission.hasPermissions = [permission, permission2];

        this.knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(adminPermission).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {
                this.permissionStatus = "createDefaultObjectAccessPermission ok";
                console.log(res);
            },
            err => console.error("Error:", err)
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
        const deleteOntology = new DeleteOntology();
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

        const onto = new UpdateOntology<CreateResourceClass>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.ontology.lastModificationDate;

        const newResClass = new CreateResourceClass();

        newResClass.name = "testclass";
        newResClass.label = [
            {
                language: "de",
                value: "Test Klasse"
            }, {
                language: "en",
                value: "Test Class"
            }
        ];
        newResClass.comment = [
            {
                language: "en",
                value: "Just an example of a new resource class"
            }
        ];
        newResClass.subClassOf = [Constants.Resource];

        onto.entity = newResClass;

        this.knoraApiConnection.v2.onto.createResourceClass(onto).subscribe(
            (response: ResourceClassDefinitionWithAllLanguages) => {
                console.log('new resource class created', response);
                this.resClass = response;
            }
        );
    }

    deleteResourceClass() {

        const deleteResClass: DeleteResourceClass = new DeleteResourceClass();
        deleteResClass.id = "http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass";
        deleteResClass.lastModificationDate = this.ontology.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteResourceClass(deleteResClass).subscribe(
            (response: OntologyMetadata) => {
                this.message = 'res class has been deleted';
                console.log('res class deleted', response);
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )

    }


    createResourceProperty() {
        const onto = new UpdateOntology<CreateResourceProperty>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.ontology.lastModificationDate;

        const newResProp = new CreateResourceProperty();

        newResProp.name = "hasName";

        newResProp.label = [
            {
                language: "en",
                value: "has name"
            },
            {
                language: "de",
                value: "hat Namen"
            }
        ];

        newResProp.comment = [
            {
                language: "en",
                value: "The name of a Thing"
            },
            {
                language: "de",
                value: "Der Name eines Dinges"
            }
        ];

        newResProp.subPropertyOf = [Constants.HasValue, "http://schema.org/name"];

        newResProp.objectType = Constants.TextValue;
        // newResProp.subjectType = "http://0.0.0.0:3333/ontology/0001/anything/v2#Thing";

        newResProp.guiElement = "http://api.knora.org/ontology/salsah-gui/v2#SimpleText";
        newResProp.guiAttributes = ["size=80", "maxlength=100"];

        onto.entity = newResProp;

        this.knoraApiConnection.v2.onto.createResourceProperty(onto).subscribe(
            (response: ResourcePropertyDefinitionWithAllLanguages) => {
                this.property = response;
                console.log('new resource property created', response);
            }
        );
    }

    deleteResourceProperty() {

        const deleteResProp: DeleteResourceProperty = new DeleteResourceProperty();
        deleteResProp.id = "http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName";
        deleteResProp.lastModificationDate = this.ontology.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteResourceProperty(deleteResProp).subscribe(
            (response: OntologyMetadata) => {
                this.message = 'res property has been deleted';
                console.log('res property deleted', response);
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )

    }

    addCardinality() {

        const addCard = new UpdateOntologyResourceClassCardinality();

        addCard.lastModificationDate = this.ontology.lastModificationDate;

        addCard.id = this.ontology.id;

        addCard.cardinalities = [
            {
                propertyIndex: "http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName",
                cardinality: Cardinality._0_1,
                resourceClass: "http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass"
            }
        ];

        this.knoraApiConnection.v2.onto.addCardinalityToResourceClass(addCard).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.addCard = res;
                console.log('added card: ', res)
            }
        );


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

    getProjectMetadata(): void {
        const resourceIri = 'http://rdfh.ch/projects/0001';

        this.knoraApiConnection.v2.metadata.getProjectMetadata(resourceIri).subscribe(
            (res: ProjectsMetadata) => {
                console.log(res);
                this.projectMetaStatus = 'OK';
            },
            error => {
                this.projectMetaStatus = 'Error';
            }
        );
    }

    updateProjectMetadata(): void {
        const resourceIri = 'http://rdfh.ch/projects/0001';

        this.knoraApiConnection.v2.metadata.updateProjectMetadata(resourceIri, metadataPayload).subscribe(
            (res: UpdateProjectMetadataResponse) => {
                console.log(res);
                this.projectMetaStatus = 'OK';
            },
            error => {
                this.projectMetaStatus = 'Error';
            }
        );
    }
}
