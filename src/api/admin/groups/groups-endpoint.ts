import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

import { CreateGroupRequest } from "../../../models/admin/create-group-request";
import { GroupResponse } from "../../../models/admin/group-response";
import { GroupsResponse } from "../../../models/admin/groups-response";
import { MembersResponse } from "../../../models/admin/members-response";
import { StoredGroup } from "../../../models/admin/stored-group";


/**
 * An endpoint for working with Knora groups.
 */
export class GroupsEndpoint extends Endpoint {
    
    /**
     * Returns a list of all groups.
     */
    getGroups(): Observable<ApiResponseData<GroupsResponse> | ApiResponseError> {
    
        return this.httpGet("").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Creates a group.
     * 
     * @param group The group to be created.
     */
    createGroup(group: CreateGroupRequest): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpPost("", group).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets a group by IRI.
     * 
     * @param iri The IRI of the group.
     */
    getGroupByIri(iri: string): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(iri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Updates a group.
     * 
     * @param group The group to be updated.
     */
    updateGroup(group: StoredGroup): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(group.id), group).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Updates the status of a group.
     * 
     * @param group The group to be updated.
     */
    updateGroupStatus(group: StoredGroup): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(group.id) + "/status", group).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Deletes a group. This method does not actually delete a group, but sets the status to false.
     * 
     * @param iri The IRI of the group.
     */
    deleteGroup(iri: string): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpDelete("/" + encodeURIComponent(iri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets the members of a group.
     * 
     * @param iri The IRI of the group.
     */
    getGroupMembers(iri: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(iri) + "/members").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, MembersResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
}
