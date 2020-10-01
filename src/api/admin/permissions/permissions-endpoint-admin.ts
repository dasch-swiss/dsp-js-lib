import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AdministrativePermissionResponse } from "../../../models/admin/administrative-permission-response";
import { AdministrativePermissionsResponse } from "../../../models/admin/administrative-permissions-response";
import { DefaultObjectAccessPermissionResponse } from "../../../models/admin/default-object-access-permission-response";
import { ProjectPermissionsResponse } from "../../../models/admin/project-permissions-response";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { CreateAdministrativePermission } from "../../../models/admin/create-administrative-permission";
import { Endpoint } from "../../endpoint";
import { DefaultObjectAccessPermissionsResponse } from "../../../models/admin/default-object-access-permissions-response";
import { CreateDefaultObjectAccessPermission } from "../../../models/admin/create-default-object-access-permission";

/**
 * An endpoint for working with Knora permissions.
 */
export class PermissionsEndpointAdmin extends Endpoint {

    getPermissions(projectIri: string): Observable<ApiResponseError | ApiResponseData<ProjectPermissionsResponse>> {

        return this.httpGet("/" + encodeURIComponent(projectIri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectPermissionsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    }

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

        return this.httpPost("/ap", this.jsonConvert.serializeObject(administrativePermission)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, AdministrativePermissionResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Gets all default object access permissions for a project.
     *
     * @param projectIri The project IRI.
     */
    getDefaultObjectAccessPermissions(projectIri: string): Observable<ApiResponseError | ApiResponseData<DefaultObjectAccessPermissionsResponse>> {

        return this.httpGet("/doap/" + encodeURIComponent(projectIri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, DefaultObjectAccessPermissionsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }

    createDefaultObjectAccessPermission(defaultObjectAccessPermission: CreateDefaultObjectAccessPermission): Observable<ApiResponseError | ApiResponseData<DefaultObjectAccessPermissionResponse>> {

        return this.httpPost("/doap", this.jsonConvert.serializeObject(defaultObjectAccessPermission)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, DefaultObjectAccessPermissionResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );

    }
    
}
