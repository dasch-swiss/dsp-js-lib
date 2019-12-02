export class Constants {

    static KnoraApiV2 = "http://api.knora.org/ontology/knora-api/v2";
    static Delimiter = "#";
    static IsResourceClass = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceClass";
    static IsStandoffClass = Constants.KnoraApiV2 + Constants.Delimiter + "isStandoffClass";
    static IsResourceProperty = Constants.KnoraApiV2 + Constants.Delimiter + "isResourceProperty";
    static ObjectType = Constants.KnoraApiV2 + Constants.Delimiter + "objectType";
    static SubjectType = Constants.KnoraApiV2 + Constants.Delimiter + "subjectType";
    static IsLinkProperty = Constants.KnoraApiV2 + Constants.Delimiter + "isLinkProperty";
    static IsLinkValueProperty = Constants.KnoraApiV2 + Constants.Delimiter + "isLinkValueProperty";
    static IsEditable = Constants.KnoraApiV2 + Constants.Delimiter + "isEditable";
    static IsInherited = Constants.KnoraApiV2 + Constants.Delimiter + "isInherited";
    static CanBeInstantiated = Constants.KnoraApiV2 + Constants.Delimiter + "canBeInstantiated";

    static BooleanValue = Constants.KnoraApiV2 + Constants.Delimiter + "BooleanValue";
    static ColorValue = Constants.KnoraApiV2 + Constants.Delimiter + "ColorValue";
    static GeonameValue = Constants.KnoraApiV2 + Constants.Delimiter + "GeonameValue";
    static DateValue = Constants.KnoraApiV2 + Constants.Delimiter + "DateValue";
    static IntValue = Constants.KnoraApiV2 + Constants.Delimiter + "IntValue";
    static DecimalValue = Constants.KnoraApiV2 + Constants.Delimiter + "DecimalValue";
    static IntervalValue = Constants.KnoraApiV2 + Constants.Delimiter + "IntervalValue";
    static ListValue = Constants.KnoraApiV2 + Constants.Delimiter + "ListValue";
    static TextValue = Constants.KnoraApiV2 + Constants.Delimiter + "TextValue";
    static LinkValue = Constants.KnoraApiV2 + Constants.Delimiter + "LinkValue";
    static UriValue = Constants.KnoraApiV2 + Constants.Delimiter + "UriValue";
    static GeomValue = Constants.KnoraApiV2 + Constants.Delimiter + "GeomValue";
    static FileValue = Constants.KnoraApiV2 + Constants.Delimiter + "FileValue";
    static AudioFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "AudioFileValue";
    static DDDFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "DDDFileValue";
    static DocumentFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "DocumentFileValue";
    static StillImageFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "StillImageFileValue";
    static MovingImageFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "MovingImageFileValue";
    static TextFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "TextFileValue";
    static IsRootNode = Constants.KnoraApiV2 + Constants.Delimiter + "isRootNode";
    static HasRootNode = Constants.KnoraApiV2 + Constants.Delimiter + "hasRootNode";
    static HasSubListNode = Constants.KnoraApiV2 + Constants.Delimiter + "hasSubListNode";
    static HasStillImageFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "hasStillImageFileValue";
    static HasTextFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "hasTextFileValue";
    static HasMovingImageFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "hasMovingImageFileValue";
    static HasDocumentFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "hasDocumentFileValue";
    static HasDDDFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "hasDDDFileValue";
    static HasAudioFileValue = Constants.KnoraApiV2 + Constants.Delimiter + "hasAudioFileValue";

    static AttachedToProject = Constants.KnoraApiV2 + Constants.Delimiter + "attachedToProject";
    static AttachedToUser = Constants.KnoraApiV2 + Constants.Delimiter + "attachedToUser";
    static ArkUrl = Constants.KnoraApiV2 + Constants.Delimiter + "arkUrl";
    static VersionArkUrl = Constants.KnoraApiV2 + Constants.Delimiter + "versionArkUrl";
    static CreationDate = Constants.KnoraApiV2 + Constants.Delimiter + "creationDate";
    static ValueCreationDate = Constants.KnoraApiV2 + Constants.Delimiter + "valueCreationDate";
    static ValueHasUUID = Constants.KnoraApiV2 + Constants.Delimiter + "valueHasUUID";
    static LastModificationDate = Constants.KnoraApiV2 + Constants.Delimiter + "lastModificationDate";
    static HasPermissions = Constants.KnoraApiV2 + Constants.Delimiter + "hasPermissions";
    static UserHasPermission = Constants.KnoraApiV2 + Constants.Delimiter + "userHasPermission";

    static BooleanValueAsBoolean = Constants.KnoraApiV2 + Constants.Delimiter + "booleanValueAsBoolean";
    static ColorValueAsColor = Constants.KnoraApiV2 + Constants.Delimiter + "colorValueAsColor";
    static GeonameValueAsGeonameCode = Constants.KnoraApiV2 + Constants.Delimiter + "geonameValueAsGeonameCode";
    static DateValueHasCalendar = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasCalendar";
    static DateValueHasEndDay = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasEndDay";
    static DateValueHasEndEra = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasEndEra";
    static DateValueHasEndMonth = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasEndMonth";
    static DateValueHasEndYear = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasEndYear";
    static DateValueHasStartDay = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasStartDay";
    static DateValueHasStartEra = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasStartEra";
    static DateValueHasStartMonth = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasStartMonth";
    static DateValueHasStartYear = Constants.KnoraApiV2 + Constants.Delimiter + "dateValueHasStartYear";
    static IntValueAsInt = Constants.KnoraApiV2 + Constants.Delimiter + "intValueAsInt";
    static DecimalValueAsDecimal = Constants.KnoraApiV2 + Constants.Delimiter + "decimalValueAsDecimal";
    static IntervalValueHasStart = Constants.KnoraApiV2 + Constants.Delimiter + "intervalValueHasStart";
    static IntervalValueHasEnd = Constants.KnoraApiV2 + Constants.Delimiter + "intervalValueHasEnd";
    static ListValueAsListNode = Constants.KnoraApiV2 + Constants.Delimiter + "listValueAsListNode";
    static ValueAsString = Constants.KnoraApiV2 + Constants.Delimiter + "valueAsString";
    static TextValueAsXml = Constants.KnoraApiV2 + Constants.Delimiter + "textValueAsXml";
    static TextValueHasMapping = Constants.KnoraApiV2 + Constants.Delimiter + "textValueHasMapping";
    static TextValueAsHtml = Constants.KnoraApiV2 + Constants.Delimiter + "textValueAsHtml";
    static LinkValueHasTarget = Constants.KnoraApiV2 + Constants.Delimiter + "linkValueHasTarget";
    static LinkValueHasTargetIri = Constants.KnoraApiV2 + Constants.Delimiter + "linkValueHasTargetIri";
    static LinkValueHasSource = Constants.KnoraApiV2 + Constants.Delimiter + "linkValueHasSource";
    static LinkValueHasSourceIri = Constants.KnoraApiV2 + Constants.Delimiter + "linkValueHasSourceIri";
    static UriValueAsUri = Constants.KnoraApiV2 + Constants.Delimiter + "uriValueAsUri";
    static GeometryValueAsGeometry = Constants.KnoraApiV2 + Constants.Delimiter + "geometryValueAsGeometry";
    static StillImageFileValueHasDimX = Constants.KnoraApiV2 + Constants.Delimiter + "stillImageFileValueHasDimX";
    static StillImageFileValueHasDimY = Constants.KnoraApiV2 + Constants.Delimiter + "stillImageFileValueHasDimY";
    static StillImageFileValueHasIIIFBaseUrl = Constants.KnoraApiV2 + Constants.Delimiter + "stillImageFileValueHasIIIFBaseUrl";
    static AudioFileValueHasDuration = Constants.KnoraApiV2 + Constants.Delimiter + "audioFileValueHasDuration";
    static MovingImageFileValueHasDimX = Constants.KnoraApiV2 + Constants.Delimiter + "movingImageFileValueHasDimX";
    static MovingImageFileValueHasDimY = Constants.KnoraApiV2 + Constants.Delimiter + "movingImageFileValueHasDimY";
    static MovingImageFileValueHasDuration = Constants.KnoraApiV2 + Constants.Delimiter + "movingImageFileValueHasDuration";
    static MovingImageFileValueHasFps = Constants.KnoraApiV2 + Constants.Delimiter + "movingImageFileValueHasFps";
    static FileValueHasFilename = Constants.KnoraApiV2 + Constants.Delimiter + "fileValueHasFilename";
    static FileValueAsUrl = Constants.KnoraApiV2 + Constants.Delimiter + "fileValueAsUrl";
    static ValueHasComment = Constants.KnoraApiV2 + Constants.Delimiter + "valueHasComment";
    static DeleteComment = Constants.KnoraApiV2 + Constants.Delimiter + "deleteComment";
    static Result = Constants.KnoraApiV2 + Constants.Delimiter + "result";

    static KnoraAdmin = "http://www.knora.org/ontology";
    static DefaultSharedOntologyIRI: string = Constants.KnoraAdmin + "#DefaultSharedOntologiesProject";
    static SystemProjectIRI: string = Constants.KnoraAdmin + "#SystemProject";
    static SystemAdminGroupIRI: string = Constants.KnoraAdmin + "#SystemAdmin";
    static ProjectAdminGroupIRI: string = Constants.KnoraAdmin + "#ProjectAdmin";
    static ProjectMemberGroupIRI: string = Constants.KnoraAdmin + "#ProjectMember";

    static SalsahGui = "http://api.knora.org/ontology/salsah-gui/v2";
    static GuiAttribute = Constants.SalsahGui + Constants.Delimiter + "guiAttribute";
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

    static Xsd = "http://www.w3.org/2001/XMLSchema";
    static XsdAnyUri = Constants.Xsd + Constants.Delimiter + "anyURI";
    static XsdDecimal = Constants.Xsd + Constants.Delimiter + "decimal";
    static dateTimeStamp = Constants.Xsd + Constants.Delimiter + "dateTimeStamp";

    static SchemaNumberOfItems = "http://schema.org/numberOfItems";

}
