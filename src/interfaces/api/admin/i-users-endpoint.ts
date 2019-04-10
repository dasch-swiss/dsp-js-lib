import { Observable } from "rxjs";
import { UsersResponse } from "../../../models/admin/users-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";

export const IUsersEndpointUrl: Map<string, string> = new Map([
    ["getAll", "/"]
]);

export interface IUsersEndpoint {
    //getAll(): Observable<ApiResponseData<UsersResponse> | ApiResponseError>;
}
