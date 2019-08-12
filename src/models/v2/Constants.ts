export class Constants {

    static KnoraApiV2 = "http://api.knora.org/ontology/knora-api/v2";
    static Delimiter = "#";
    static IsResourceClass = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceClass";
    static IsResourceProperty = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceProperty";

    static SalsahGui = "http://api.knora.org/ontology/salsah-gui/v2";
    static GuiOrder = Constants.SalsahGui + Constants.Delimiter + "guiOrder";

    static Owl = "http://www.w3.org/2002/07/owl";
    static Restriction = Constants.Owl + Constants.Delimiter + "Restriction";
    static MaxCardinality = Constants.Owl + Constants.Delimiter + "maxCardinality";
    static MinCardinality = Constants.Owl + Constants.Delimiter + "minCardinality";
    static Cardinality = Constants.Owl + Constants.Delimiter + "cardinality";
    static OnProperty = Constants.Owl + Constants.Delimiter + "onProperty";

    static Rdfs = "http://www.w3.org/2000/01/rdf-schema";
    static SubClassOf = Constants.Rdfs + Constants.Delimiter + "subClassOf";
    static Comment = Constants.Rdfs + Constants.Delimiter + "comment";
    static Label = Constants.Rdfs + Constants.Delimiter + "label";
    static SubPropertyOf = Constants.Rdfs + Constants.Delimiter + "subPropertyOf";

}
