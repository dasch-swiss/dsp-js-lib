import { Observable } from "rxjs";
import { UserList } from "../../../models/admin/user-list";
import { AjaxError } from "rxjs/ajax";

export const IUsersEndpointUrl: Map<string, string> = new Map([
    ["getAll", "/"]
]);

export interface IUsersEndpoint {
    //getAll(): Observable<UserList | AjaxError>;
}