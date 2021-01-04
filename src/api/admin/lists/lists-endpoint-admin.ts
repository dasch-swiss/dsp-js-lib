import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ChildNodeInfoResponse } from "../../../models/admin/child-node-info-response";
import { CreateChildNodeRequest } from "../../../models/admin/create-child-node-request";
import { CreateListRequest } from "../../../models/admin/create-list-request";
import { ListInfoResponse } from "../../../models/admin/list-info-response";
import { ListNodeInfoResponse } from "../../../models/admin/list-node-info-response";
import { ListResponse } from "../../../models/admin/list-response";
import { ListsResponse } from "../../../models/admin/lists-response";
import { UpdateChildNodeCommentsRequest } from "../../../models/admin/update-child-node-comments-request";
import { UpdateChildNodeLabelsRequest } from "../../../models/admin/update-child-node-labels-request";
import { UpdateChildNodeNameRequest } from "../../../models/admin/update-child-node-name-request";
import { UpdateChildNodeRequest } from "../../../models/admin/update-child-node-request";
import { UpdateListInfoRequest } from "../../../models/admin/update-list-info-request";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

/**
 * An endpoint for working with Knora lists.
 *
 * @category Endpoint Admin
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
     * Updates the name of an existing child node.
     * 
     * @param listItemIri the Iri of the list item.
     * @param name the new name to replace the existing name.
     */
    updateChildName(listItemIri: string, name: UpdateChildNodeNameRequest): Observable<ApiResponseData<ChildNodeInfoResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(listItemIri) + "/name", this.jsonConvert.serializeObject(name)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ChildNodeInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }

    /**
     * Updates the labels of an existing child node.
     * 
     * @param listItemIri the Iri of the list item.
     * @param labels the new labels to replace the existing labels.
     */
    updateChildLabels(listItemIri: string, labels: UpdateChildNodeLabelsRequest): Observable<ApiResponseData<ChildNodeInfoResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(listItemIri) + "/labels", this.jsonConvert.serializeObject(labels)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ChildNodeInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }

    /**
     * Updates the comments of an existing child node.
     * 
     * @param listItemIri the Iri of the list item.
     * @param comments the new comments to replace the existing comments.
     */
    updateChildComments(listItemIri: string, comments: UpdateChildNodeCommentsRequest): Observable<ApiResponseData<ChildNodeInfoResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(listItemIri) + "/comments", this.jsonConvert.serializeObject(comments)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ChildNodeInfoResponse, this.jsonConvert)),
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

    // *** All methods below this point require the "new-list-admin-routes:1=on" feature toggle ***

    /**
     * Updates a child node.
     * 
     * @param nodeInfo Information about the node to be updated.
     */
    updateChildNode(nodeInfo: UpdateChildNodeRequest): Observable<ApiResponseData<ChildNodeInfoResponse> | ApiResponseError> {
    
        return this.httpPut("/" + encodeURIComponent(nodeInfo.listIri), this.jsonConvert.serializeObject(nodeInfo), undefined, { "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" }).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ChildNodeInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }

    /**
     * Returns information about a list node using the new route.
     * 
     * @param listItemIri The IRI of the node.
     */
    getListNodeInfoV2(listItemIri: string): Observable<ApiResponseData<ListNodeInfoResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(listItemIri) + "/info", { "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" }).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListNodeInfoResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }

    /**
     * Creates a list using the old route but with the feature toggle enabled.
     * 
     * @param listInfo Information about the list to be created.
     */
    createListV2(listInfo: CreateListRequest): Observable<ApiResponseData<ListResponse> | ApiResponseError> {
    
        return this.httpPost("", this.jsonConvert.serializeObject(listInfo), undefined, { "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" }).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }

    /**
     * Gets a list using the old route but with the feature toggle enabled
     * 
     * @param listItemIri The IRI of the list.
     */
    getListV2(listItemIri: string): Observable<ApiResponseData<ListResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(listItemIri), { "X-Knora-Feature-Toggles": "new-list-admin-routes:1=on" }).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ListResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
}
