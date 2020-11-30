import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

import { CreateChildNodeRequest } from "../../../models/admin/create-child-node-request";
import { CreateListRequest } from "../../../models/admin/create-list-request";
import { ListInfoResponse } from "../../../models/admin/list-info-response";
import { ListNodeInfoResponse } from "../../../models/admin/list-node-info-response";
import { ListResponse } from "../../../models/admin/list-response";
import { ListsResponse } from "../../../models/admin/lists-response";
import { UpdateListInfoRequest } from "../../../models/admin/update-list-info-request";


/**
 * An endpoint for working with Knora lists.
 *
 * @category Endpoint
 */
export class ListsEndpointAdmin extends Endpoint {
    
    /**
     * Returns a list of lists.
     */
    getLists(): Observable<ApiResponseData<ListsResponse> | ApiResponseError> {
    
        return this.httpGet("").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Returns a list of lists in a project.
     * 
     * @param projectIri The IRI of the project.
     */
    getListsInProject(projectIri: string): Observable<ApiResponseData<ListsResponse> | ApiResponseError> {
    
        return this.httpGet("?projectIri=" + encodeURIComponent(projectIri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Creates a list.
     * 
     * @param listInfo Information about the list to be created.
     */
    createList(listInfo: CreateListRequest): Observable<ApiResponseData<ListResponse> | ApiResponseError> {
    
        return this.httpPost("", this.jsonConvert.serializeObject(listInfo)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets a list.
     * 
     * @param iri The IRI of the list.
     */
    getList(iri: string): Observable<ApiResponseData<ListResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(iri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Updates information about a list.
     * 
     * @param listInfo Information about the list to be created.
     */
    updateListInfo(listInfo: UpdateListInfoRequest): Observable<ApiResponseData<ListInfoResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(listInfo.listIri), this.jsonConvert.serializeObject(listInfo)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Creates a child node in a list.
     * 
     * @param node The node to be created.
     */
    createChildNode(node: CreateChildNodeRequest): Observable<ApiResponseData<ListNodeInfoResponse> | ApiResponseError> {
    
        return this.httpPost("/" + encodeURIComponent(node.parentNodeIri), this.jsonConvert.serializeObject(node)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListNodeInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Returns information about a list.
     * 
     * @param iri The IRI of the list.
     */
    getListInfo(iri: string): Observable<ApiResponseData<ListInfoResponse> | ApiResponseError> {
    
        return this.httpGet("/infos/" + encodeURIComponent(iri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Returns information about a list node.
     * 
     * @param iri The IRI of the node.
     */
    getListNodeInfo(iri: string): Observable<ApiResponseData<ListNodeInfoResponse> | ApiResponseError> {
    
        return this.httpGet("/nodes/" + encodeURIComponent(iri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListNodeInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
}
