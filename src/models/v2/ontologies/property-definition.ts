export abstract class PropertyDefinition {
    abstract id: string;

    abstract subPropertyOf: string[];

    abstract comment?: string;

    abstract label?: string;

    abstract subjectType?: string;

    abstract objectType?: string;
}
