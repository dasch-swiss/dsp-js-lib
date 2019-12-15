import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AdministrativePermissionResponse, UsersResponse } from "../../..";
import { FullListResponse } from "../../../models/admin/fulllist-response";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { FullList, ProjectLists } from "../../../models/admin/lists";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

export class ListsEndpoint extends Endpoint {

    getProjectLists(projectIri: string): Observable<Array<ProjectLists> | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora
        return this.httpGet("?projectIri=" + encodeURIComponent(projectIri)).pipe(
            map(
                (ajaxResponse: AjaxResponse) => {
                    const lists: Array<ProjectLists> = []
                    if (ajaxResponse.response.hasOwnProperty("lists")) {
                        for (const listdata of ajaxResponse.response["lists"]) {
                            lists.push(this.jsonConvert.deserialize(listdata, ProjectLists) as ProjectLists);
                        }
                    }
                    return lists;
                }
            ),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    getFullList(listIri: string): Observable<ApiResponseData<FullListResponse> | ApiResponseError> {
        return this.httpGet("/" + encodeURIComponent(listIri)).pipe(
            map((ajaxResponse: AjaxResponse) => ApiResponseData.fromAjaxResponse(ajaxResponse, FullListResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    }
}
