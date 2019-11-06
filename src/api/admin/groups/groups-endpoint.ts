import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

import { CreateGroupRequest } from "../../../models/admin/create-group-request";
import { GroupResponse } from "../../../models/admin/group-response";
import { GroupsResponse } from "../../../models/admin/groups-response";
import { MembersResponse } from "../../../models/admin/members-response";
import { UpdateGroupRequest } from "../../../models/admin/update-group-request";

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
    
        return this.httpPost("", this.jsonConvert.serializeObject(group)).pipe(
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
     * @param iri The IRI of the group to be updated.
     * @param groupInfo The group information to be updated.
     */
    updateGroup(iri: string, groupInfo: UpdateGroupRequest): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(iri), this.jsonConvert.serializeObject(groupInfo)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, GroupResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Updates the status of a group.
     * 
     * @param iri The IRI of the group to be updated.
     * @param status The new status of the group.
     */
    updateGroupStatus(iri: string, status: boolean): Observable<ApiResponseData<GroupResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(iri) + "/status", { status: status }).pipe(
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
