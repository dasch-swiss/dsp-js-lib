import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { Endpoint } from "../../endpoint";

import { KeywordsResponse } from "../../../models/admin/keywords-response";
import { MembersResponse } from "../../../models/admin/members-response";
import { Project } from "../../../models/admin/project";
import { ProjectResponse } from "../../../models/admin/project-response";
import { ProjectRestrictedViewSettingsResponse } from "../../../models/admin/project-restricted-view-settings-response";
import { ProjectsResponse } from "../../../models/admin/projects-response";
import { UpdateProjectRequest } from "../../../models/admin/update-project-request";

/**
 * An endpoint for working with Knora projects.
 */
export class ProjectsEndpoint extends Endpoint {
    
    /**
     * Returns a list of all projects.
     */
    getProjects(): Observable<ApiResponseData<ProjectsResponse> | ApiResponseError> {
    
        return this.httpGet("").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Creates a project.
     * 
     * @param project The project to be created.
     */
    createProject(project: Project): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.httpPost("", project).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets all the unique keywords for all projects.
     */
    getKeywords(): Observable<ApiResponseData<KeywordsResponse> | ApiResponseError> {
    
        return this.httpGet("/Keywords").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, KeywordsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets all the keywords for a project.
     * 
     * @param iri The IRI of the project.
     */
    getProjectKeywords(iri: string): Observable<ApiResponseData<KeywordsResponse> | ApiResponseError> {
    
        return this.httpGet("/iri/" + encodeURIComponent(iri) + "/Keywords").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, KeywordsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Updates a project.
     * 
     * @param iri The IRI of the project to be updated.
     * @param projectInfo The project info to be updated.
     */
    updateProject(iri: string, projectInfo: UpdateProjectRequest): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.httpPut("/iri/" + encodeURIComponent(iri), projectInfo).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Deletes a project. This method does not actually delete a project, but sets the status to false.
     * 
     * @param iri The project IRI.
     */
    deleteProject(iri: string): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.httpDelete("/iri/" + encodeURIComponent(iri)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets a project by a property.
     * 
     * @param property The name of the property by which the project is identified.
     * @param value The value of the property by which the project is identified.
     */
    getProject(property: "iri" | "shortname" | "shortcode", value: string): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(property) + "/" + encodeURIComponent(value)).pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets a project by IRI.
     * 
     * @param iri The IRI of the project.
     */
    getProjectByIri(iri: string): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.getProject("iri", iri);
    
    }
    
    /**
     * Gets a project by shortname.
     * 
     * @param shortname The shortname of the project.
     */
    getProjectByShortname(shortname: string): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.getProject("shortname", shortname);
    
    }
    
    /**
     * Gets a project by shortcode.
     * 
     * @param shortcode The shortcode of the project.
     */
    getProjectByShortcode(shortcode: string): Observable<ApiResponseData<ProjectResponse> | ApiResponseError> {
    
        return this.getProject("shortcode", shortcode);
    
    }
    
    /**
     * Gets a project's members by a property.
     * 
     * @param property The name of the property by which the project is identified.
     * @param value The value of the property by which the project is identified.
     */
    getProjectMembers(property: "iri" | "shortname" | "shortcode", value: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(property) + "/" + encodeURIComponent(value) + "/members").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, MembersResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets the members of a project by IRI.
     * 
     * @param iri The IRI of the project.
     */
    getProjectMembersByIri(iri: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.getProjectMembers("iri", iri);
    
    }
    
    /**
     * Gets a project's members by shortname.
     * 
     * @param shortname The shortname of the project.
     */
    getProjectMembersByShortname(shortname: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.getProjectMembers("shortname", shortname);
    
    }
    
    /**
     * Gets a project's members by shortcode.
     * 
     * @param shortcode The shortcode of the project.
     */
    getProjectMembersByShortcode(shortcode: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.getProjectMembers("shortcode", shortcode);
    
    }
    
    /**
     * Gets a project's admin members by a property.
     * 
     * @param property The name of the property by which the project is identified.
     * @param value The value of the property by which the project is identified.
     */
    getProjectAdminMembers(property: "iri" | "shortname" | "shortcode", value: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(property) + "/" + encodeURIComponent(value) + "/admin-members").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, MembersResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets the admin members of a project by IRI.
     * 
     * @param iri The IRI of the project.
     */
    getProjectAdminMembersByIri(iri: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.getProjectAdminMembers("iri", iri);
    
    }
    
    /**
     * Gets a project's admin members by shortname.
     * 
     * @param shortname The shortname of the project.
     */
    getProjectAdminMembersByShortname(shortname: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.getProjectAdminMembers("shortname", shortname);
    
    }
    
    /**
     * Gets a project's admin members by shortcode.
     * 
     * @param shortcode The shortcode of the project.
     */
    getProjectAdminMembersByShortcode(shortcode: string): Observable<ApiResponseData<MembersResponse> | ApiResponseError> {
    
        return this.getProjectAdminMembers("shortcode", shortcode);
    
    }
    
    /**
     * Gets a project's restricted view settings by a property.
     * 
     * @param property The name of the property by which the project is identified.
     * @param value The value of the property by which the project is identified.
     */
    getProjectRestrictedViewSettings(property: "iri" | "shortname" | "shortcode", value: string): Observable<ApiResponseData<ProjectRestrictedViewSettingsResponse> | ApiResponseError> {
    
        return this.httpGet("/" + encodeURIComponent(property) + "/" + encodeURIComponent(value) + "/RestrictedViewSettings").pipe(
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, ProjectRestrictedViewSettingsResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
    /**
     * Gets a project's restricted view settings by IRI.
     * 
     * @param iri The IRI of the project.
     */
    getProjectRestrictedViewSettingByIri(iri: string): Observable<ApiResponseData<ProjectRestrictedViewSettingsResponse> | ApiResponseError> {
    
        return this.getProjectRestrictedViewSettings("iri", iri);
    
    }
    
    /**
     * Gets a project's restricted view settings by shortname.
     * 
     * @param shortname The shortname of the project.
     */
    getProjectRestrictedViewSettingByShortname(shortname: string): Observable<ApiResponseData<ProjectRestrictedViewSettingsResponse> | ApiResponseError> {
    
        return this.getProjectRestrictedViewSettings("shortname", shortname);
    
    }
    
    /**
     * Gets a project's restricted view settings by shortcode.
     * 
     * @param shortcode The shortcode of the project.
     */
    getProjectRestrictedViewSettingByShortcode(shortcode: string): Observable<ApiResponseData<ProjectRestrictedViewSettingsResponse> | ApiResponseError> {
    
        return this.getProjectRestrictedViewSettings("shortcode", shortcode);
    
    }
    
}
