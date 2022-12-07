import { Component, OnInit } from '@angular/core';
import {
    AdministrativePermissionResponse,
    AdministrativePermissionsResponse,
    ApiResponseData,
    ApiResponseError, CanDoResponse, Cardinality,
    ChildNodeInfoResponse,
    Constants,
    CountQueryResponse,
    CreateAdministrativePermission,
    CreateBooleanValue,
    CreateChildNodeRequest,
    CreateDefaultObjectAccessPermission,
    CreateIntValue,
    CreateListRequest,
    CreateOntology,
    CreatePermission,
    CreateResource,
    CreateResourceClass,
    CreateResourceProperty,
    CreateValue,
    DefaultObjectAccessPermissionResponse,
    DefaultObjectAccessPermissionsResponse,
    DeleteChildNodeCommentsResponse,
    DeleteListNodeResponse,
    DeleteListResponse,
    DeleteOntology,
    DeleteOntologyResponse,
    DeletePermissionResponse,
    DeleteResource,
    DeleteResourceClass,
    DeleteResourceClassComment,
    DeleteResourceProperty,
    DeleteResourcePropertyComment,
    DeleteResourceResponse,
    DeleteValue,
    DeleteValueResponse,
    KnoraApiConfig,
    KnoraApiConnection,
    ListNodeInfoResponse,
    ListNodeV2,
    ListResponse,
    LoginResponse,
    OntologiesMetadata,
    OntologyMetadata,
    ProjectPermissionsResponse,
    ReadOntology,
    ReadResource,
    ReadResourceSequence,
    RepositionChildNodeRequest,
    RepositionChildNodeResponse,
    ResourceClassDefinitionWithAllLanguages,
    ResourcePropertyDefinitionWithAllLanguages,
    StringLiteral,
    UpdateAdministrativePermission,
    UpdateAdministrativePermissionGroup,
    UpdateChildNodeCommentsRequest,
    UpdateChildNodeLabelsRequest,
    UpdateChildNodeNameRequest,
    UpdateChildNodeRequest,
    UpdateDefaultObjectAccessPermission,
    UpdateDefaultObjectAccessPermissionGroup,
    UpdateDefaultObjectAccessPermissionProperty,
    UpdateDefaultObjectAccessPermissionResourceClass,
    UpdateIntValue,
    UpdateOntology,
    UpdateOntologyMetadata,
    UpdatePermission,
    UpdateResource,
    UpdateResourceClassCardinality,
    UpdateResourceClassComment,
    UpdateResourceClassLabel,
    UpdateResourceMetadata,
    UpdateResourceMetadataResponse,
    UpdateResourcePropertyComment, UpdateResourcePropertyGuiElement, UpdateResourcePropertyLabel,
    UpdateValue,
    UserCache,
    UserResponse,
    UsersResponse,
    WriteValueResponse
} from '@dasch-swiss/dsp-js';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    knoraApiConnection: KnoraApiConnection;

    userCache: UserCache;

    healthState: Observable<any>;
    version: Observable<any>;

    ontologies: Map<string, ReadOntology>;
    ontologyWithAllLangs: ReadOntology;
    anythingOntologies: OntologiesMetadata;
    dokubibOntologies: OntologiesMetadata;
    ontologyMeta: OntologyMetadata;
    ontology: ReadOntology;
    lastModificationDate: string;
    resClass: ResourceClassDefinitionWithAllLanguages;
    property: ResourcePropertyDefinitionWithAllLanguages;
    addCard: ResourceClassDefinitionWithAllLanguages;
    replacedCard: ResourceClassDefinitionWithAllLanguages;
    cardinality = Cardinality._0_1;
    permissionStatus: string;
    permissionUpdateStatus: string;
    permissionIri: string;
    permissionDeleted: boolean;

    canDeletePropertyResponse: boolean;
    canDeleteClassResponse: boolean;
    canDeleteCardinalityResponse: boolean;
    canReplaceCardinalityResponse: boolean;
    canDeleteOntologyResponse: boolean;

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

    listName = '';
    listLabels = '';
    listComments = '';
    listChildren = 0;
    listChildName = '';
    listChildLabels = '';
    listChildComments = '';
    listNodeId = '';
    listNodeDeleted = false;
    listNodePosition = 0;
    listNodeParentIri = '';

    // canDoResponse: boolean;

    ngOnInit() {
        const config = new KnoraApiConfig('http', '0.0.0.0', 3333, undefined, undefined, true);
        this.knoraApiConnection = new KnoraApiConnection(config);
        // console.log(this.knoraApiConnection);
        this.userCache = new UserCache(this.knoraApiConnection);

        this.getHealthStatus();
        this.getVersion();

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

    getVersion() {
        this.version =
            this.knoraApiConnection.system.versionEndpoint.getVersion().pipe(
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

        this.knoraApiConnection.admin.permissionsEndpoint.getProjectPermissions('http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ').subscribe(
            (response: ApiResponseData<ProjectPermissionsResponse>) => {
                this.permissionStatus = 'getPermissions ok';
                console.log(response);
            },
            err => console.error('Error:', err)
        );
    }

    getAdministrativePermission() {

        this.knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermission('http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ', 'http://www.knora.org/ontology/knora-admin#ProjectMember').subscribe(
            (response: ApiResponseData<AdministrativePermissionResponse>) => {
                this.permissionStatus = 'getAdministrativePermission ok';
                this.permissionIri = response.body.administrative_permission.id;
                console.log(response);
            },
            err => console.error('Error:', err)
        );

    }

    getAdministrativePermissions() {

        this.knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermissions('http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ').subscribe(
            (response: ApiResponseData<AdministrativePermissionsResponse>) => {
                this.permissionStatus = 'getAdministrativePermissions ok';
                console.log(response);
            },
            err => console.error('Error:', err)
        );

    }

    createAdministrativePermission() {

        const permission = new CreatePermission();
        permission.name = 'ProjectAdminGroupAllPermission';
        permission.additionalInformation = null;
        permission.permissionCode = null;

        const permission2 = new CreatePermission();
        permission2.name = 'ProjectAdminAllPermission';
        permission2.additionalInformation = null;
        permission2.permissionCode = null;

        const groupIri = 'http://rdfh.ch/groups/0001/thing-searcher';
        const projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';

        const adminPermission = new CreateAdministrativePermission();
        adminPermission.forGroup = groupIri;
        adminPermission.forProject = projectIri;

        adminPermission.hasPermissions = [permission, permission2];

        this.knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission).subscribe(
            (res: ApiResponseData<AdministrativePermissionResponse>) => {
                this.permissionStatus = "createAdministrativePermission ok";
                this.permissionIri = res.body.administrative_permission.id;
                console.log(res);
            },
            err => console.error(err)
        );

    }

    updateAdministrativePermissionGroup() {
        const updateAdminPermGroup = new UpdateAdministrativePermissionGroup();

        updateAdminPermGroup.forGroup = "http://rdfh.ch/groups/00FF/images-reviewer";

        this.knoraApiConnection.admin.permissionsEndpoint.updateAdministrativePermissionGroup(this.permissionIri, updateAdminPermGroup).subscribe(
            (res: ApiResponseData<AdministrativePermissionResponse>) => {
                this.permissionUpdateStatus = "updateAdministrativePermissionGroup ok";
                console.log(res);
            },
            err => console.error(err)
        );
    }

    updateAdministrativePermission() {

        const perm = new UpdatePermission();
        perm.additionalInformation = null;
        perm.name = "ProjectAdminGroupAllPermission";
        perm.permissionCode = null;

        const updateAdminPerm = new UpdateAdministrativePermission();

        updateAdminPerm.hasPermissions = [perm];

        this.knoraApiConnection.admin.permissionsEndpoint.updateAdministrativePermission(this.permissionIri, updateAdminPerm).subscribe(
            (res: ApiResponseData<AdministrativePermissionResponse>) => {
                this.permissionUpdateStatus = "updateAdministrativePermission ok";
                console.log(res);
            },
            err => console.error(err)
        );

    }

    deletePermission() {

        this.knoraApiConnection.admin.permissionsEndpoint.deletePermission(this.permissionIri).subscribe(
            (res: ApiResponseData<DeletePermissionResponse>) => {
                this.permissionDeleted = res.body.deleted;
                console.log(res);
            },
            err => console.error(err)
        );

    }

    getDefaultObjectAccessPermissions() {

        const projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';

        this.knoraApiConnection.admin.permissionsEndpoint.getDefaultObjectAccessPermissions(projectIri).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionsResponse>) => {
                this.permissionStatus = "getDefaultObjectAccessPermissions ok";
                this.permissionIri = res.body.defaultObjectAccessPermissions[0].id;
                console.log(res);
            },
            err => console.error('Error:', err)
        );
    }

    createDefaultObjectAccessPermission() {

        const permission = new CreatePermission();
        permission.name = 'D';
        permission.permissionCode = 7;
        permission.additionalInformation = 'http://www.knora.org/ontology/knora-admin#ProjectMember';

        const permission2 = new CreatePermission();
        permission2.name = 'D';
        permission2.permissionCode = 7;
        permission2.additionalInformation = 'http://www.knora.org/ontology/knora-admin#KnownUser';

        const groupIri = 'http://rdfh.ch/groups/0001/thing-searcher';
        const projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';

        const adminPermission = new CreateDefaultObjectAccessPermission();
        adminPermission.forGroup = groupIri;
        adminPermission.forProject = projectIri;

        adminPermission.hasPermissions = [permission, permission2];

        this.knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(adminPermission).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {
                this.permissionStatus = 'createDefaultObjectAccessPermission ok';
                console.log(res);
            },
            err => console.error('Error:', err)
        );

    }

    updateDefaultObjectAccessPermission() {

        const perm = new UpdatePermission();
        perm.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";
        perm.name = "D";
        perm.permissionCode = 7;

        const updateDefaultObjectAccessPerm = new UpdateDefaultObjectAccessPermission();

        updateDefaultObjectAccessPerm.hasPermissions = [perm];

        this.knoraApiConnection.admin.permissionsEndpoint.updateDefaultObjectAccessPermission(this.permissionIri, updateDefaultObjectAccessPerm).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {
                this.permissionUpdateStatus = "updateDefaultObjectAccessPermission ok";
                console.log(res);
            },
            err => console.error(err)
        );

    }

    updateDefaultObjectAccessPermissionGroup() {
        const updateAdminPermGroup = new UpdateDefaultObjectAccessPermissionGroup();

        updateAdminPermGroup.forGroup = "http://rdfh.ch/groups/00FF/images-reviewer";

        this.knoraApiConnection.admin.permissionsEndpoint.updateDefaultObjectAccessPermissionGroup(this.permissionIri, updateAdminPermGroup).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {
                this.permissionUpdateStatus = "updateDefaultObjectAccessPermissionGroup ok";
                console.log(res);
            },
            err => console.error(err)
        );
    }

    updateDefaultObjectAccessPermissionResourceClass() {
        const defaultObjectAccessPermissionResourceClass = new UpdateDefaultObjectAccessPermissionResourceClass();

        defaultObjectAccessPermissionResourceClass.forResourceClass = "http://www.knora.org/ontology/0803/incunabula#book";

        this.knoraApiConnection.admin.permissionsEndpoint.updateDefaultObjectAccessPermissionResourceClass(this.permissionIri, defaultObjectAccessPermissionResourceClass).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {
                this.permissionUpdateStatus = "updateDefaultObjectAccessPermissionResourceClass ok";
                console.log(res);
            },
            err => console.error(err)
        );
    }

    updateDefaultObjectAccessPermissionProperty() {
        const defaultObjectAccessPermissionProperty = new UpdateDefaultObjectAccessPermissionProperty();

        defaultObjectAccessPermissionProperty.forProperty = "http://www.knora.org/ontology/00FF/images#titel";

        this.knoraApiConnection.admin.permissionsEndpoint.updateDefaultObjectAccessPermissionProperty(this.permissionIri, defaultObjectAccessPermissionProperty).subscribe(
            (res: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {
                this.permissionUpdateStatus = "updateDefaultObjectAccessPermissionProperty ok";
                console.log(res);
            },
            err => console.error(err)
        );
    }

    getOntology(iri: string) {

        this.knoraApiConnection.v2.ontologyCache.getOntology(iri).subscribe(
            onto => {
                console.log('cached onto ', onto);
                this.ontologies = onto;
            }
        );
    }

    reloadOntologyCache(iri: string) {

        this.knoraApiConnection.v2.ontologyCache.reloadCachedItem(iri).subscribe(
            onto => {
                console.log('reloaded cached onto ', onto);
                this.ontologies[onto.id] = onto;
            }
        );
    }

    getOntologyWithAllLanguages(iri: string) {

        this.knoraApiConnection.v2.onto.getOntology(iri, true).subscribe(
            (onto: ReadOntology) => {
                console.log(onto);
                this.ontologyWithAllLangs = onto;
            },
            err => console.error(err)
        );
    }

    getAnythingOntologies() {
        this.knoraApiConnection.v2.onto.getOntologiesByProjectIri('http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ').subscribe(
            (response: OntologiesMetadata) => {
                console.log('anythingOntologies ', response);
                this.anythingOntologies = response;
            },
            (error: ApiResponseError) => {
                console.error('project ontologies error', error);
            }
        );
    }
    getDokubibOntologies() {
        this.knoraApiConnection.v2.onto.getOntologiesByProjectIri('http://rdfh.ch/projects/oIjhUsZmQLuJ0VMGvJ2pfg').subscribe(
            (response: OntologiesMetadata) => {
                console.log('dokubibOntologies ', response);
                this.dokubibOntologies = response;
            },
            (error: ApiResponseError) => {
                console.error('project ontologies error', error);
            }
        );
    }

    createOntology() {
        const createOntology = new CreateOntology();
        createOntology.label = 'Test Ontology';
        createOntology.name = 'testonto';
        createOntology.attachedToProject = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';
        this.knoraApiConnection.v2.onto.createOntology(createOntology).subscribe(
            (onto: OntologyMetadata) => {
                this.ontologyMeta = onto;
                console.log('new ontology created', onto);
                this.lastModificationDate = onto.lastModificationDate;
            }
        );
    }

    getTestOnto(iri: string) {
        this.knoraApiConnection.v2.onto.getOntology(iri).subscribe(
            (onto: ReadOntology) => {
                this.ontology = onto;
                this.lastModificationDate = onto.lastModificationDate;
                console.log('get testonto ', onto);
            }
        );
    }

    updateOntologyLabel() {
        const updateOntologyMetadata = new UpdateOntologyMetadata();
        updateOntologyMetadata.id = this.ontology.id;
        updateOntologyMetadata.lastModificationDate = this.lastModificationDate
        updateOntologyMetadata.label = 'Test Onto';

        this.knoraApiConnection.v2.onto.updateOntology(updateOntologyMetadata).subscribe(
            (onto: OntologyMetadata) => {
                this.ontologyMeta = onto;
                this.lastModificationDate = onto.lastModificationDate;
            }
        );
    }

    updateOntologyComment() {
        const updateOntologyMetadata = new UpdateOntologyMetadata();
        updateOntologyMetadata.id = this.ontology.id;
        updateOntologyMetadata.lastModificationDate = this.lastModificationDate
        updateOntologyMetadata.comment = 'Ontology comment updated';

        this.knoraApiConnection.v2.onto.updateOntology(updateOntologyMetadata).subscribe(
            (onto: OntologyMetadata) => {
                this.ontologyMeta = onto;
                this.lastModificationDate = onto.lastModificationDate;
            }
        );
    }

    removeOntologyComment() {
        const updateOntologyMetadata = new UpdateOntologyMetadata();
        updateOntologyMetadata.id = this.ontology.id;
        updateOntologyMetadata.lastModificationDate = this.lastModificationDate
        updateOntologyMetadata.comment = '';

        this.knoraApiConnection.v2.onto.updateOntology(updateOntologyMetadata).subscribe(
            (onto: OntologyMetadata) => {
                this.ontologyMeta = onto;
                this.lastModificationDate = onto.lastModificationDate;
            }
        );
    }

    updateOntologyLabelAndComment() {
        const updateOntologyMetadata = new UpdateOntologyMetadata();
        updateOntologyMetadata.id = this.ontology.id;
        updateOntologyMetadata.lastModificationDate = this.lastModificationDate
        updateOntologyMetadata.label = 'Test Onto New Label';
        updateOntologyMetadata.comment = 'Test Onto New Comment';

        this.knoraApiConnection.v2.onto.updateOntology(updateOntologyMetadata).subscribe(
            (onto: OntologyMetadata) => {
                this.ontologyMeta = onto;
                this.lastModificationDate = onto.lastModificationDate;
            }
        );
    }

    canDeleteOntology() {
        const ontologyId = this.ontology.id;

        this.knoraApiConnection.v2.onto.canDeleteOntology(ontologyId).subscribe(
            (response: CanDoResponse) => {
                this.canDeleteOntologyResponse = response.canDo;
            }
        );
    }

    deleteOntology() {
        const deleteOntology = new DeleteOntology();
        deleteOntology.id = this.ontology.id;
        deleteOntology.lastModificationDate = this.lastModificationDate

        this.knoraApiConnection.v2.onto.deleteOntology(deleteOntology).subscribe(
            (response: DeleteOntologyResponse) => {
                this.message = response.result;
                console.log('ontology deleted', response);
                this.ontology = undefined;
                this.lastModificationDate = undefined;
            }
        );
    }

    createResourceClass() {

        const onto = new UpdateOntology<CreateResourceClass>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate

        const newResClass = new CreateResourceClass();

        newResClass.name = 'testclass';
        newResClass.label = [
            {
                language: 'de',
                value: 'Test Klasse'
            }, {
                language: 'en',
                value: 'Test Class'
            }
        ];
        newResClass.comment = [
            {
                language: 'en',
                value: 'Just an example of a new resource class'
            }
        ];
        newResClass.subClassOf = [Constants.Resource];

        onto.entity = newResClass;

        this.knoraApiConnection.v2.onto.createResourceClass(onto).subscribe(
            (response: ResourceClassDefinitionWithAllLanguages) => {
                console.log('new resource class created', response);
                this.resClass = response;
                this.lastModificationDate = response.lastModificationDate;
            }
        );
    }

    updateResourceClassLabel() {

        const onto = new UpdateOntology<UpdateResourceClassLabel>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate

        const updateLabel = new UpdateResourceClassLabel();

        updateLabel.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        updateLabel.labels = [
            {
                language: 'de',
                value: 'Test Klasse neu'
            }, {
                language: 'en',
                value: 'Test Class new'
            }
        ];

        onto.entity = updateLabel;

        this.knoraApiConnection.v2.onto.updateResourceClass(onto).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.resClass = res;
                this.lastModificationDate = res.lastModificationDate;
            }
        );

    }

    updateResourceClassComment() {

        const onto = new UpdateOntology<UpdateResourceClassComment>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate

        const updateLabel = new UpdateResourceClassComment();

        updateLabel.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        updateLabel.comments = [
            {
                language: 'de',
                value: 'Just an example of a new resource class new'
            }
        ];

        onto.entity = updateLabel;

        this.knoraApiConnection.v2.onto.updateResourceClass(onto).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.resClass = res;
                this.lastModificationDate = res.lastModificationDate;
            }
        );

    }

    canDeleteClass() {
        const resClassIri = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        this.knoraApiConnection.v2.onto.canDeleteResourceClass(resClassIri).subscribe(
            (response: CanDoResponse) => {
                this.canDeleteClassResponse = response.canDo;
            }
        );
    }

    deleteResourceClass() {

        const deleteResClass: DeleteResourceClass = new DeleteResourceClass();
        deleteResClass.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';
        deleteResClass.lastModificationDate = this.lastModificationDate

        this.knoraApiConnection.v2.onto.deleteResourceClass(deleteResClass).subscribe(
            (response: OntologyMetadata) => {
                this.message = 'res class has been deleted';
                console.log('res class deleted', response);
                this.lastModificationDate = response.lastModificationDate;
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        );

    }

    deleteResourceClassComment() {
        const deleteResClassComment: DeleteResourceClassComment = new DeleteResourceClassComment();
        deleteResClassComment.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';
        deleteResClassComment.lastModificationDate = this.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteResourceClassComment(deleteResClassComment).subscribe(
            (response: ResourceClassDefinitionWithAllLanguages) => {
                this.resClass = response;
                this.lastModificationDate = response.lastModificationDate;
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )
    }


    createResourceProperty() {
        const onto = new UpdateOntology<CreateResourceProperty>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate

        const newResProp = new CreateResourceProperty();

        newResProp.name = 'hasName';

        newResProp.label = [
            {
                language: 'en',
                value: 'has name'
            },
            {
                language: 'de',
                value: 'hat Namen'
            }
        ];

        newResProp.comment = [
            {
                language: 'en',
                value: 'The name of a Thing'
            },
            {
                language: 'de',
                value: 'Der Name eines Dinges'
            }
        ];

        newResProp.subPropertyOf = [Constants.HasValue, 'http://schema.org/name'];

        newResProp.objectType = Constants.TextValue;
        // newResProp.subjectType = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';

        newResProp.guiElement = 'http://api.knora.org/ontology/salsah-gui/v2#SimpleText';
        newResProp.guiAttributes = ['size=80', 'maxlength=100'];

        onto.entity = newResProp;

        this.knoraApiConnection.v2.onto.createResourceProperty(onto).subscribe(
            (response: ResourcePropertyDefinitionWithAllLanguages) => {
                this.property = response;
                console.log('new resource property created', response);
                this.lastModificationDate = response.lastModificationDate;
            }
        );
    }

    updateResourcePropertyLabel() {

        const onto = new UpdateOntology<UpdateResourcePropertyLabel>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate

        const updateLabel = new UpdateResourcePropertyLabel();

        updateLabel.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';

        updateLabel.labels = [
            {
                language: 'en',
                value: 'has name new'
            },
            {
                language: 'de',
                value: 'hat Namen neu'
            }
        ];

        onto.entity = updateLabel;

        this.knoraApiConnection.v2.onto.updateResourceProperty(onto).subscribe(
            (res: ResourcePropertyDefinitionWithAllLanguages) => {
                this.property = res;
                this.lastModificationDate = res.lastModificationDate;
            }
        );

    }

    updateResourcePropertyComment() {

        const onto = new UpdateOntology<UpdateResourcePropertyComment>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate

        const updateLabel = new UpdateResourcePropertyComment();

        updateLabel.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';

        updateLabel.comments = [
            {
                language: 'en',
                value: 'The name of a Thing new'
            },
            {
                language: 'de',
                value: 'Der Name eines Dinges neu'
            }
        ];

        onto.entity = updateLabel;

        this.knoraApiConnection.v2.onto.updateResourceProperty(onto).subscribe(
            (res: ResourcePropertyDefinitionWithAllLanguages) => {
                this.property = res;
                this.lastModificationDate = res.lastModificationDate;
            }
        );

    }

    updateResourcePropertyGuielement() {

        const onto = new UpdateOntology<UpdateResourcePropertyGuiElement>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate


        const updateGuiEle = new UpdateResourcePropertyGuiElement();
        updateGuiEle.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';
        updateGuiEle.guiElement = 'http://api.knora.org/ontology/salsah-gui/v2#Textarea';

        onto.entity = updateGuiEle;

        this.knoraApiConnection.v2.onto.replaceGuiElementOfProperty(onto).subscribe(
            (res: ResourcePropertyDefinitionWithAllLanguages) => {
                this.property = res;
                this.lastModificationDate = res.lastModificationDate;
            }
        );

    }

    canDeleteProperty() {
        const propIri = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';

        this.knoraApiConnection.v2.onto.canDeleteResourceProperty(propIri).subscribe(
            (response: CanDoResponse) => {
                this.canDeletePropertyResponse = response.canDo;
            }
        );
    }

    deleteResourceProperty() {

        const deleteResProp: DeleteResourceProperty = new DeleteResourceProperty();
        deleteResProp.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';
        deleteResProp.lastModificationDate = this.lastModificationDate

        this.knoraApiConnection.v2.onto.deleteResourceProperty(deleteResProp).subscribe(
            (response: OntologyMetadata) => {
                this.message = 'res property has been deleted';
                this.lastModificationDate = response.lastModificationDate;
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        );

    }

    deleteResourcePropertyComment() {
        const deleteResPropertyComment: DeleteResourcePropertyComment = new DeleteResourcePropertyComment();
        deleteResPropertyComment.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';
        deleteResPropertyComment.lastModificationDate = this.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteResourcePropertyComment(deleteResPropertyComment).subscribe(
            (response: ResourcePropertyDefinitionWithAllLanguages) => {
                console.log('response: ', response);
                this.property = response;
                this.lastModificationDate = response.lastModificationDate;
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )
    }

    addCardinality() {

        const onto = new UpdateOntology<UpdateResourceClassCardinality>();

        onto.lastModificationDate = this.lastModificationDate

        onto.id = this.ontology.id;

        const addCard = new UpdateResourceClassCardinality();

        addCard.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        addCard.cardinalities = [
            {
                propertyIndex: 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName',
                cardinality: this.cardinality
            }
        ];

        onto.entity = addCard;

        this.knoraApiConnection.v2.onto.addCardinalityToResourceClass(onto).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.addCard = res;
                console.log('added card: ', res)
                this.lastModificationDate = res.lastModificationDate;
            },
            err => console.error(err)
        );

    }

    canReplaceCardinality() {

        const resClassIri = 'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing';

        this.knoraApiConnection.v2.onto.canReplaceCardinalityOfResourceClass(resClassIri).subscribe(
            (response: CanDoResponse) => {
                this.canReplaceCardinalityResponse = response.canDo;
            });


    }

    replaceCardinality() {

        this.cardinality = Cardinality._1;

        const onto = new UpdateOntology<UpdateResourceClassCardinality>();

        onto.lastModificationDate = this.lastModificationDate

        onto.id = this.ontology.id;

        const replaceCard = new UpdateResourceClassCardinality();

        replaceCard.cardinalities = [
            {
                propertyIndex: 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName',
                cardinality: this.cardinality
            }
        ];

        replaceCard.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        onto.entity = replaceCard;

        this.knoraApiConnection.v2.onto.replaceCardinalityOfResourceClass(onto).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.replacedCard = res;
                console.log('replace card: ', res)
                this.lastModificationDate = res.lastModificationDate;
            },
            err => console.error(err)
        );

    }

    replaceGuiOrder() {
        const onto = new UpdateOntology<UpdateResourceClassCardinality>();

        onto.lastModificationDate = this.lastModificationDate

        onto.id = this.ontology.id;

        const updateGO = new UpdateResourceClassCardinality();

        updateGO.cardinalities = [
            {
                propertyIndex: 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName',
                cardinality: this.cardinality,
                guiOrder: Math.floor(Math.random() * 10) + 1  // returns a random integer from 1 to 10
            }
        ];

        updateGO.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        onto.entity = updateGO;

        this.knoraApiConnection.v2.onto.replaceGuiOrderOfCardinalities(onto).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.replacedCard = res;
                console.log('update gui order: ', res)
                this.lastModificationDate = res.lastModificationDate;
            },
            err => console.error(err)
        );
    }

    canDeleteCardinality() {
        const onto = new UpdateOntology<UpdateResourceClassCardinality>();

        onto.lastModificationDate = this.lastModificationDate

        onto.id = this.ontology.id;

        const deleteCard = new UpdateResourceClassCardinality();

        deleteCard.cardinalities = [
            {
                propertyIndex: 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName',
                cardinality: this.cardinality
            }
        ];

        deleteCard.id = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

        onto.entity = deleteCard;

        this.knoraApiConnection.v2.onto.canDeleteCardinalityFromResourceClass(onto).subscribe(
            (res: CanDoResponse) => {
                this.canDeleteCardinalityResponse = res.canDo;
            },
            (err: ApiResponseError) => console.error(err)
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

        createResource.attachedToProject = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';

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

    updateChildNode(): void {
        const childNode = new UpdateChildNodeRequest();

        const newLabels = new StringLiteral();
        newLabels.language = 'en';
        newLabels.value = 'updated label';

        childNode.labels = [newLabels];

        const newComments = new StringLiteral();
        newComments.language = 'en';
        newComments.value = 'updated comment';

        childNode.comments = [newComments];

        childNode.listIri = 'http://rdfh.ch/lists/0001/treeList01';

        childNode.projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';

        this.knoraApiConnection.admin.listsEndpoint.updateChildNode(childNode).subscribe(
            (res: ApiResponseData<ChildNodeInfoResponse>) => {
                this.listChildLabels =
                    res.body.nodeinfo.labels[0].language
                    + '/'
                    + res.body.nodeinfo.labels[0].value;

                this.listChildComments =
                    res.body.nodeinfo.comments[0].language
                    + '/'
                    + res.body.nodeinfo.comments[0].value;

                this.listChildName = res.body.nodeinfo.name;
            }
        );
    }

    updateChildName(): void {
        const childNodeName = new UpdateChildNodeNameRequest();

        const listItemIri = 'http://rdfh.ch/lists/0001/treeList01';

        const newName = 'updated child name';

        childNodeName.name = newName;

        this.knoraApiConnection.admin.listsEndpoint.updateChildName(listItemIri, childNodeName).subscribe(
            (res: ApiResponseData<ChildNodeInfoResponse>) => {
                this.listChildName = res.body.nodeinfo.name;
            }
        );
    }

    updateChildLabels(): void {
        const childNodeLabels = new UpdateChildNodeLabelsRequest();

        const listItemIri = 'http://rdfh.ch/lists/0001/treeList01';

        const newLabels = new StringLiteral();
        newLabels.language = 'en';
        newLabels.value = 'new label';

        childNodeLabels.labels = [newLabels];

        this.knoraApiConnection.admin.listsEndpoint.updateChildLabels(listItemIri, childNodeLabels).subscribe(
            (res: ApiResponseData<ChildNodeInfoResponse>) => {
                this.listChildLabels =
                    res.body.nodeinfo.labels[0].language
                    + '/'
                    + res.body.nodeinfo.labels[0].value;
            }
        );
    }

    updateChildComments(): void {
        const childNodeComments = new UpdateChildNodeCommentsRequest();

        const listItemIri = 'http://rdfh.ch/lists/0001/treeList01';

        const newComments = new StringLiteral();
        newComments.language = 'en';
        newComments.value = 'new comment';

        childNodeComments.comments = [newComments];

        this.knoraApiConnection.admin.listsEndpoint.updateChildComments(listItemIri, childNodeComments).subscribe(
            (res: ApiResponseData<ChildNodeInfoResponse>) => {
                this.listChildComments =
                    res.body.nodeinfo.comments[0].language
                    + '/'
                    + res.body.nodeinfo.comments[0].value;
            }
        );
    }

    deleteChildComments(): void {
        const listItemIri = 'http://rdfh.ch/lists/0001/treeList01';

        this.knoraApiConnection.admin.listsEndpoint.deleteChildComments(listItemIri).subscribe(
            (res: ApiResponseData<DeleteChildNodeCommentsResponse>) => {
                this.listChildComments = undefined;
            }
        );
    }

    getListNodeInfo(): void {
        const listItemIri = 'http://rdfh.ch/lists/0001/treeList01';

        this.knoraApiConnection.admin.listsEndpoint.getListNodeInfo(listItemIri).subscribe(
            (res: ApiResponseData<ListNodeInfoResponse>) => {
                console.log(res);

                this.listNodeId = res.body.nodeinfo.id;

            }
        );
    }

    createList(): void {
        const list = new CreateListRequest();

        list.projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';

        const label = new StringLiteral();
        label.language = 'de';
        label.value = 'Neue Liste';

        list.labels = [label];

        const comments = new StringLiteral();
        comments.language = 'de';
        comments.value = 'Neuer Kommentar';

        list.comments = [comments];

        this.knoraApiConnection.admin.listsEndpoint.createList(list).subscribe(
            (res: ApiResponseData<ListResponse>) => {

                this.listLabels =
                    res.body.list.listinfo.labels[0].language
                    + '/'
                    + res.body.list.listinfo.labels[0].value;

                this.listComments =
                    res.body.list.listinfo.comments[0].language
                    + '/'
                    + res.body.list.listinfo.comments[0].value;
            }
        );
    }

    createListChildNode(): void {
        const createRequest = new CreateChildNodeRequest();
        createRequest.parentNodeIri = 'http://rdfh.ch/lists/0001/notUsedList';
        createRequest.projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';
        createRequest.name = 'new child node';
        createRequest.labels = [{ 'value': 'New Child List Node Value', 'language': 'en' }];
        createRequest.comments = [{ 'value': 'New Child List Node Comment', 'language': 'en' }];

        this.knoraApiConnection.admin.listsEndpoint.createChildNode(createRequest).subscribe(
            (res: ApiResponseData<ListNodeInfoResponse>) => {
                this.listChildLabels =
                    res.body.nodeinfo.labels[0].language
                    + '/'
                    + res.body.nodeinfo.labels[0].value;

                this.listChildComments =
                    res.body.nodeinfo.comments[0].language
                    + '/'
                    + res.body.nodeinfo.comments[0].value;

                this.listChildName = res.body.nodeinfo.name;

                this.listNodePosition = res.body.nodeinfo.position;
            }
        );
    }

    createListChildNodeAtPosition(): void {
        const createRequest = new CreateChildNodeRequest();
        createRequest.parentNodeIri = 'http://rdfh.ch/lists/0001/notUsedList';
        createRequest.projectIri = 'http://rdfh.ch/projects/Lw3FC39BSzCwvmdOaTyLqQ';
        createRequest.name = 'new child node at position 1';
        createRequest.labels = [{ 'value': 'New Child List Node at Position 1 Value', 'language': 'en' }];
        createRequest.comments = [{ 'value': 'New Child List Node at Position 1 Comment', 'language': 'en' }];
        createRequest.position = 1;

        this.knoraApiConnection.admin.listsEndpoint.createChildNode(createRequest).subscribe(
            (res: ApiResponseData<ListNodeInfoResponse>) => {
                this.listChildLabels =
                    res.body.nodeinfo.labels[0].language
                    + '/'
                    + res.body.nodeinfo.labels[0].value;

                this.listChildComments =
                    res.body.nodeinfo.comments[0].language
                    + '/'
                    + res.body.nodeinfo.comments[0].value;

                this.listChildName = res.body.nodeinfo.name;

                this.listNodePosition = res.body.nodeinfo.position;
            }
        );
    }

    getList(): void {
        const listItemIri = 'http://rdfh.ch/lists/0001/treeList';

        this.knoraApiConnection.admin.listsEndpoint.getList(listItemIri).subscribe(
            (res: ApiResponseData<ListResponse>) => {
                this.listName = res.body.list.listinfo.name;
                this.listChildren = res.body.list.children.length;
            }
        );
    }

    deleteListChildNode(): void {
        const listItemIri = 'http://rdfh.ch/lists/0001/notUsedList015';

        this.knoraApiConnection.admin.listsEndpoint.deleteListNode(listItemIri).subscribe(
            (res: ApiResponseData<DeleteListNodeResponse>) => {
                this.listChildren = res.body.node.children.length;
            }
        );
    }

    deleteListRootNode(): void {
        const listItemIri = 'http://rdfh.ch/lists/0001/notUsedList';

        this.knoraApiConnection.admin.listsEndpoint.deleteListNode(listItemIri).subscribe(
            (res: ApiResponseData<DeleteListResponse>) => {
                this.listNodeDeleted = res.body.deleted;
            },
            err => console.error('Error:', err)
        );
    }

    repositionListChildNode(): void {
        const childNodeIri = 'http://rdfh.ch/lists/0001/notUsedList01';

        const repositionRequest = new RepositionChildNodeRequest();
        repositionRequest.parentNodeIri = 'http://rdfh.ch/lists/0001/notUsedList';
        repositionRequest.position = -1;

        this.knoraApiConnection.admin.listsEndpoint.repositionChildNode(childNodeIri, repositionRequest).subscribe(
            (res: ApiResponseData<RepositionChildNodeResponse>) => {
                this.listNodePosition = res.body.node.children[res.body.node.children.length - 1].position;
                this.listNodeParentIri = res.body.node.children[res.body.node.children.length - 1].hasRootNode;
            },
            err => console.error('Error:', err)
        );
    }

    repositionListChildNodeNewParent(): void {
        const childNodeIri = 'http://rdfh.ch/lists/0001/notUsedList01';

        const repositionRequest = new RepositionChildNodeRequest();
        repositionRequest.parentNodeIri = 'http://rdfh.ch/lists/0001/notUsedList02';
        repositionRequest.position = -1;

        this.knoraApiConnection.admin.listsEndpoint.repositionChildNode(childNodeIri, repositionRequest).subscribe(
            (res: ApiResponseData<RepositionChildNodeResponse>) => {
                this.listNodePosition = res.body.node.children[res.body.node.children.length - 1].position;
                this.listNodeParentIri = res.body.node.children[res.body.node.children.length - 1].hasRootNode;
            },
            err => console.error('Error:', err)
        );
    }

}
