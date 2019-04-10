export interface IProject {
    id: string;
    shortName: string;
    shortCode: string;
    longName: string;
    description: string[];
    keywords: string[];
    logo: string;
    institution: string;
    ontologies: string[];
    status: boolean;
    selfJoin: boolean;
}
