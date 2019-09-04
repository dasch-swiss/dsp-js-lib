import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AdministrativePermissionResponse } from "../../../models/admin/administrative-permission-response";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

/**
 * An endpoint for working with Knora permissions.
 */
export class PermissionsEndpoint extends Endpoint {

    /**
     * Gets the administrative permission for a project and group.
     *
     * @param projectIri The project IRI.
     * @param groupIri The group IRI.
     * @param permissionType The permission type.
     */
    getAdministrativePermission(projectIri: string, groupIri: string, permissionType: string): Observable<ApiResponseData<AdministrativePermissionResponse> | ApiResponseError> {

        return this.httpGet("/" + encodeURIComponent(projectIri) + "/" + encodeURIComponent(groupIri) + "?permissionType=" + encodeURIComponent(permissionType)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, AdministrativePermissionResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

}
