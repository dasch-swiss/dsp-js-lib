import { IProject } from "./i-project";

export interface IGroup {
    id: string;
    name: string;
    description: string;
    project: IProject | null;
    status: boolean;
    selfJoin: boolean;
}
