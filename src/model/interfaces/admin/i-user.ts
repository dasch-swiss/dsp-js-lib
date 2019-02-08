export interface IUser {
    id: string;
    email: string;
    username: string;
    password: string;
    token: string
    givenName: string;
    familyName: string;
    status: boolean;
    lang: string;
    groups: any[];
    projects: any[];
    sessionId: string;
    permissions: any;
    systemAdmin?: boolean;
}