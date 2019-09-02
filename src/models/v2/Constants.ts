export class Constants {

    static KnoraApiV2 = "http://api.knora.org/ontology/knora-api/v2";
    static Delimiter = "#";
    static IsResourceClass = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceClass";
    static IsStandoffClass = Constants.KnoraApiV2 + Constants.Delimiter + "isStandoffClass";
    static IsResourceProperty = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceProperty";
    static ObjectType = Constants.KnoraApiV2 + Constants.Delimiter + "objectType";
    static SubjectType = Constants.KnoraApiV2 + Constants.Delimiter + "subjectType";
    static LastModificationDate = Constants.KnoraApiV2 + Constants.Delimiter + "lastModificationDate";

    static BooleanValue = Constants.KnoraApiV2 + Constants.Delimiter + "BooleanValue";
    static ColorValue = Constants.KnoraApiV2 + Constants.Delimiter + "ColorValue";
    static DateValue = Constants.KnoraApiV2 + Constants.Delimiter + "DateValue";
    static IntValue = Constants.KnoraApiV2 + Constants.Delimiter + "IntValue";
    static DecimalValue = Constants.KnoraApiV2 + Constants.Delimiter + "DecimalValue";

    static AttachedToProject = Constants.KnoraApiV2 +  Constants.Delimiter  + "attachedToProject";
    static AttachedToUser = Constants.KnoraApiV2 +  Constants.Delimiter  + "attachedToUser";
    static ArkUrl = Constants.KnoraApiV2 +  Constants.Delimiter  + "arkUrl";
    static VersionArkUrl = Constants.KnoraApiV2 +  Constants.Delimiter  + "versionArkUrl";

    static BooleanValueAsBoolean = Constants.KnoraApiV2 +  Constants.Delimiter  + "booleanValueAsBoolean";
    static ColorValueAsColor = Constants.KnoraApiV2 +  Constants.Delimiter  + "colorValueAsColor";
    static DateValueHasCalendar = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasCalendar";
    static DateValueHasEndDay = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasEndDay";
    static DateValueHasEndEra = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasEndEra";
    static DateValueHasEndMonth = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasEndMonth";
    static DateValueHasEndYear = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasEndYear";
    static DateValueHasStartDay = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasStartDay";
    static DateValueHasStartEra = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasStartEra";
    static DateValueHasStartMonth = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasStartMonth";
    static DateValueHasStartYear = Constants.KnoraApiV2 +  Constants.Delimiter  + "dateValueHasStartYear";
    static IntValueAsInt = Constants.KnoraApiV2 +  Constants.Delimiter  + "intValueAsInt";
    static DecimalValueAsDecimal = Constants.KnoraApiV2 +  Constants.Delimiter  + "decimalValueAsDecimal";

    
    static KnoraAdminV2 = "http://api.knora.org/ontology/knora-admin/v2";

    static SalsahGui = "http://api.knora.org/ontology/salsah-gui/v2";
    static GuiOrder = Constants.SalsahGui + Constants.Delimiter + "guiOrder";
    static GuiElement = Constants.SalsahGui + Constants.Delimiter + "guiElement";


    static Owl = "http://www.w3.org/2002/07/owl";
    static Class = Constants.Owl + Constants.Delimiter + "Class";
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
