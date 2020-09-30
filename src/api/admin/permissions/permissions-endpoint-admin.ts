import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AdministrativePermissionResponse } from "../../../models/admin/administrative-permission-response";
import { AdministrativePermissionsResponse } from "../../../models/admin/administrative-permissions-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { CreateAdministrativePermission } from "../../../models/admin/create-administrative-permission";
import { Endpoint } from "../../endpoint";

/**
 * An endpoint for working with Knora permissions.
 */
export class PermissionsEndpointAdmin extends Endpoint {

    /**
     * Gets the administrative permissions for a project.
     *
     * @param projectIri The project IRI.
     */
    getAdministrativePermissions(projectIri: string): Observable<ApiResponseData<AdministrativePermissionsResponse> | ApiResponseError> {

        return this.httpGet("/ap/" + encodeURIComponent(projectIri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, AdministrativePermissionsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Gets the administrative permission for a project and group.
     * 
     * @param projectIri The project IRI.
     * @param groupIri The group IRI.
     */
    getAdministrativePermission(projectIri: string, groupIri: string): Observable<ApiResponseData<AdministrativePermissionResponse> | ApiResponseError> {
    
        return this.httpGet("/ap/" + encodeURIComponent(projectIri) + "/" + encodeURIComponent(groupIri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, AdministrativePermissionResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }

    /**
     * Creates an administrative permission.
     *
     * @param administrativePermission the administrative permission to be created.
     */
    createAdministrativePermission(administrativePermission: CreateAdministrativePermission): Observable<ApiResponseError | ApiResponseData<AdministrativePermissionResponse>> {

        // console.log(JSON.stringify(administrativePermission));

        // console.log(JSON.stringify(this.jsonConvert.serializeObject(administrativePermission)));

        return this.httpPost("/ap", this.jsonConvert.serializeObject(administrativePermission)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, AdministrativePermissionResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }
    
}
