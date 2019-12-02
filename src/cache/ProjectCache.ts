import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProjectResponse } from "..";
import { KnoraApiConnection } from "../knora-api-connection";
import { ApiResponseData } from "../models/api-response-data";
import { GenericCache } from "./GenericCache";

/**
 * Caches user information obtained from Knora.
 */
export class ProjectCache extends GenericCache<ProjectResponse> {

    constructor(private knoraApiConnection: KnoraApiConnection) {
        super();
    }

    protected requestItemFromKnora(key: string, isDependency: boolean): Observable<ProjectResponse[]> {
        return this.knoraApiConnection.admin.projectsEndpoint.getProject("shortcode", key).pipe(
            map((response: ApiResponseData<ProjectResponse>) => {
                return [response.body];
            })
        );
    }

    protected getKeyOfItem(item: ProjectResponse): string {
        return item.project.shortcode;
    }

    protected getDependenciesOfItem(item: ProjectResponse): string[] {
        return [];
    }

}
