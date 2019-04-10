import { Observable } from "rxjs";
import { UserList } from "../../../models/admin/user-list";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";

export const IUsersEndpointUrl: Map<string, string> = new Map([
    ["getAll", "/"]
]);

export interface IUsersEndpoint {
    getAll(): Observable<ApiResponseData<UserList> | ApiResponseError>;
}
