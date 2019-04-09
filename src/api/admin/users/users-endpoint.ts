import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../../../models/admin/user";
import { UserList } from "../../../models/admin/user-list";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { Endpoint } from "../../endpoint";
import { IUsersEndpoint, IUsersEndpointUrl } from "../../../interfaces/api/admin/i-users-endpoint";
import { ApiResponse } from "../../../models/api-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";

export class UsersEndpoint extends Endpoint implements IUsersEndpoint  {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">
    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">

    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAll(): Observable<ApiResponseData<UserList> | ApiResponseError> {

        return this.httpGet("").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, UserList, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    // </editor-fold>

}
