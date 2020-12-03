import { Component, OnInit } from '@angular/core';
import {
    ApiResponseData,
    ApiResponseError,
    Cardinality,
    Constants,
    CreateOntology,
    CreateResourceClass,
    CreateResourceProperty,
    DeleteOntology,
    DeleteOntologyResponse,
    DeleteResourceClass,
    DeleteResourceProperty,
    KnoraApiConfig,
    KnoraApiConnection,
    LoginResponse,
    OntologyMetadata,
    ReadOntology,
    ResourceClassDefinitionWithAllLanguages,
    ResourcePropertyDefinitionWithAllLanguages,
    UpdateOntology,
    UpdateOntologyResourceClassCardinality
} from '@dasch-swiss/dsp-js';
import { from, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';


@Component({
    selector: 'app-ontology',
    templateUrl: './ontology.component.html',
    styleUrls: ['./ontology.component.scss']
})
export class OntologyComponent implements OnInit {

    knoraApiConnection: KnoraApiConnection;

    // reusable response message
    message: string;

    // ontology
    ontology: ReadOntology;
    ontologyId = 'http://0.0.0.0:3333/ontology/0001/testonto/v2';

    lastModificationDate: string;

    // resource class
    resClass: ResourceClassDefinitionWithAllLanguages;
    resClassId = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#testclass';

    // resource property
    property: ResourcePropertyDefinitionWithAllLanguages;
    propOneId = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasName';
    propTwoId = 'http://0.0.0.0:3333/ontology/0001/testonto/v2#hasDescription';

    // cardinality
    addCard: ResourceClassDefinitionWithAllLanguages;

    constructor() { }

    ngOnInit(): void {
        const config = new KnoraApiConfig('http', '0.0.0.0', 3333, undefined, undefined, true);
        this.knoraApiConnection = new KnoraApiConnection(config);
        this.message = undefined;

        // automatic login
        this.login();

        // get ontology, to know if this testonto already exists
        this.getOntology(this.ontologyId);

    }

    login() {
        this.knoraApiConnection.v2.auth.login('username', 'root', 'test').subscribe(
            (loginResponse: ApiResponseData<LoginResponse>) => {
                console.log('login', loginResponse);
            },
            error => console.error(error)
        );
    }

    getOntology(iri: string) {
        this.knoraApiConnection.v2.onto.getOntology(iri).subscribe(
            (onto: ReadOntology) => {
                this.ontology = onto;
                this.lastModificationDate = onto.lastModificationDate;
                console.log('Ontology', onto);
            },
            (error: ApiResponseError) => {
                this.message = (error.status === 404 ? "Ontology does not exist yet" : error.error.toString());
            }
        )
    }

    // create new ontology with label "Test Ontology"
    createOntology() {
        const createOntology = new CreateOntology();
        createOntology.label = 'Test Ontology';
        createOntology.name = 'testonto';
        createOntology.attachedToProject = 'http://rdfh.ch/projects/0001';
        this.knoraApiConnection.v2.onto.createOntology(createOntology).subscribe(
            (onto: OntologyMetadata) => {
                this.lastModificationDate = onto.lastModificationDate;
                this.getOntology(onto.id);
                this.message = `Ontology created: <strong>${onto.label}</strong>`;
            },
            (error: ApiResponseError) => {
                this.message = error.error.toString();
            }
        );
    }

    deleteOntology() {
        const deleteOntology = new DeleteOntology();
        deleteOntology.id = this.ontology.id;
        deleteOntology.lastModificationDate = this.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteOntology(deleteOntology).subscribe(
            (response: DeleteOntologyResponse) => {
                this.message = response.result;
                this.ontology = undefined;
            }
        )
    }

    // create new resource class
    createResourceClass() {

        const onto = new UpdateOntology<CreateResourceClass>();

        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate;

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
                this.getOntology(this.ontologyId);
                this.lastModificationDate = response.lastModificationDate;
                this.resClass = response;
                this.message = `Res class created: <strong>${response.label}</strong>`;
                console.log('resClass', this.resClass);
            }
        );
    }

    deleteResourceClass() {

        const deleteResClass: DeleteResourceClass = new DeleteResourceClass();
        deleteResClass.id = this.resClassId;
        deleteResClass.lastModificationDate = this.lastModificationDate;

        this.knoraApiConnection.v2.onto.deleteResourceClass(deleteResClass).subscribe(
            (response: OntologyMetadata) => {
                this.lastModificationDate = response.lastModificationDate;
                this.message = 'Res class has been deleted';
                this.getOntology(this.ontologyId);
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )

    }


    createResourceProperty() {
        // I want to add two res properties
        const newProperties = [];

        // first property
        const newResProp_1 = new CreateResourceProperty();

        newResProp_1.name = "hasName";
        newResProp_1.label = [
            {
                language: "en",
                value: "has name"
            },
            {
                language: "de",
                value: "hat Namen"
            }
        ];
        newResProp_1.comment = [
            {
                language: "en",
                value: "The name of a Thing"
            },
            {
                language: "de",
                value: "Der Name eines Dinges"
            }
        ];
        newResProp_1.subPropertyOf = [Constants.HasValue, "http://schema.org/name"];
        newResProp_1.objectType = Constants.TextValue;
        newResProp_1.guiElement = "http://api.knora.org/ontology/salsah-gui/v2#SimpleText";
        newResProp_1.guiAttributes = ["size=80", "maxlength=100"];

        newProperties.push(newResProp_1);

        // second property
        const newResProp_2 = new CreateResourceProperty();

        newResProp_2.name = "hasDescription";
        newResProp_2.label = [
            {
                language: "en",
                value: "has description"
            },
            {
                language: "de",
                value: "hat Beschreibung"
            }
        ];
        newResProp_2.comment = [
            {
                language: "en",
                value: "The description of a Thing"
            },
            {
                language: "de",
                value: "Die Beschreibung eines Dinges"
            }
        ];
        newResProp_2.subPropertyOf = [Constants.HasValue, "http://schema.org/name"];
        newResProp_2.objectType = Constants.TextValue;
        newResProp_2.guiElement = "http://api.knora.org/ontology/salsah-gui/v2#Textarea";
        newResProp_2.guiAttributes = ["width=100%"];

        newProperties.push(newResProp_2);

        // loop through newProperties here
        from(newProperties)
            .pipe(concatMap(prop => {
                console.log('first pipe operator...waiting...', this.lastModificationDate);
                // submit prop
                this.submitProp(prop);
                return new Promise(resolve => setTimeout(() => resolve(prop), 1000));
            }))
            .pipe(concatMap(prop => {
                console.log('second pipe operator', this.lastModificationDate);
                return of(this.property);
            }))
            .subscribe(prop => {
                this.getOntology(this.ontologyId);
                console.log('created', prop)
            });

    }

    submitProp(prop: CreateResourceProperty) {
        const onto = new UpdateOntology<CreateResourceProperty>();
        onto.id = this.ontology.id;
        onto.lastModificationDate = this.lastModificationDate;
        onto.entity = prop;

        this.knoraApiConnection.v2.onto.createResourceProperty(onto).subscribe(
            (response: ResourcePropertyDefinitionWithAllLanguages) => {
                this.property = response;
                this.lastModificationDate = response.lastModificationDate;
                console.log('new resource property created', response);
                this.message = `Res property created: <strong>${response.label}</strong>`;
                // set cardinality
                this.addCardinality(this.resClassId, this.property.id, Cardinality._0_1);
            }
        );
    }

    deleteResourceProperty(iri: string) {

        const deleteResProp: DeleteResourceProperty = new DeleteResourceProperty();
        deleteResProp.id = iri;
        deleteResProp.lastModificationDate = this.ontology.lastModificationDate;

        console.log(deleteResProp)

        this.knoraApiConnection.v2.onto.deleteResourceProperty(deleteResProp).subscribe(
            (response: OntologyMetadata) => {
                this.getOntology(this.ontologyId);
                this.lastModificationDate = response.lastModificationDate;
                this.message = 'res property has been deleted';
                console.log('res property deleted', response);
            },
            (error: ApiResponseError) => {
                console.error(error);
            }
        )

    }

    addCardinality(resIri: string, propIri: string, cardinality: Cardinality) {

        const addCard = new UpdateOntologyResourceClassCardinality();

        addCard.lastModificationDate = this.lastModificationDate;

        addCard.id = this.ontology.id;

        addCard.cardinalities = [
            {
                propertyIndex: propIri,
                cardinality: cardinality,
                resourceClass: resIri
            }
        ];

        this.knoraApiConnection.v2.onto.addCardinalityToResourceClass(addCard).subscribe(
            (res: ResourceClassDefinitionWithAllLanguages) => {
                this.lastModificationDate = res.lastModificationDate;
                this.message += ' and cardinality was set'
            }
        );


    }

}
