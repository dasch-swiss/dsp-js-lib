export class Constants {

    static KnoraApiV2 = "http://api.knora.org/ontology/knora-api/v2";
    static Delimiter = "#";
    static IsResourceClass = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceClass";
    static IsResourceProperty = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceProperty";
    static ObjectType = Constants.KnoraApiV2 + Constants.Delimiter + "objectType";
    static SubjectType = Constants.KnoraApiV2 + Constants.Delimiter + "subjectType";

    static SalsahGui = "http://api.knora.org/ontology/salsah-gui/v2";
    static GuiOrder = Constants.SalsahGui + Constants.Delimiter + "guiOrder";
    static GuiElement = Constants.SalsahGui + Constants.Delimiter + "guiElement";


    static Owl = "http://www.w3.org/2002/07/owl";
    static Restriction = Constants.Owl + Constants.Delimiter + "Restriction";
    static MaxCardinality = Constants.Owl + Constants.Delimiter + "maxCardinality";
    static MinCardinality = Constants.Owl + Constants.Delimiter + "minCardinality";
    static Cardinality = Constants.Owl + Constants.Delimiter + "cardinality";
    static OnProperty = Constants.Owl + Constants.Delimiter + "onProperty";
    static DataTypeProperty = Constants.Owl + Constants.Delimiter + "DatatypeProperty";
    static ObjectProperty = Constants.Owl + Constants.Delimiter + "ObjectProperty";


    static Rdfs = "http://www.w3.org/2000/01/rdf-schema";
    static SubClassOf = Constants.Rdfs + Constants.Delimiter + "subClassOf";
    static Comment = Constants.Rdfs + Constants.Delimiter + "comment";
    static Label = Constants.Rdfs + Constants.Delimiter + "label";
    static SubPropertyOf = Constants.Rdfs + Constants.Delimiter + "subPropertyOf";

}
