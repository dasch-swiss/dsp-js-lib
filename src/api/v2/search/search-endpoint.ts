import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError, KnoraApiConfig, ListNodeCache } from "../../..";
import { ReadResource } from "../../../models/v2/resources/read-resource";
import { ResourcesConversionUtil } from "../../../models/v2/resources/ResourcesConversionUtil";
import { CountQueryResponse } from "../../../models/v2/search/count-query-response";
import { Endpoint } from "../../endpoint";
import { V2Endpoint } from "../v2-endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Params for fulltext search.
 */
export interface IFulltextSearchParams {

    /**
     * Iri of resource class the fulltext search is restricted to, if any.
     */
    limitToResourceClass?: string;

    /**
     * Iri of the project the fulltext search is restricted to, if any.
     */
    limitToProject?: string;

    /**
     * Iri of standoff class the fulltext search is restricted to, if any.
     */
    limitToStandoffClass?: string;

}

/**
 * Params for search by label
 */
export interface ILabelSearchParams {

    /**
     * Iri of the project the search by label is restricted to, if any.
     */
    limitToResourceClass?: string;

    /**
     * Iri of the project the search by label is restricted to, if any.
     */
    limitToProject?: string;

}

/**
 * Handles requests to the search route of the Knora API.
 */
export class SearchEndpoint extends Endpoint {

    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string, private readonly v2Endpoint: V2Endpoint) {
        super(knoraApiConfig, path);
    }

    /**
     * URL encodes fulltext search params.
     *
     * @param offset offset to be used for paging, zero-based.
     * @param params parameters for fulltext search.
     */
    private static encodeFulltextParams(offset: number, params?: IFulltextSearchParams): string {

        let paramsString = `?offset=${offset}`;

        if (params !== undefined) {

            if (params.limitToResourceClass !== undefined) {
                paramsString += "&limitToResourceClass=" + encodeURIComponent(params.limitToResourceClass);
            }

            if (params.limitToProject !== undefined) {
                paramsString += "&limitToProject=" + encodeURIComponent(params.limitToProject);
            }

            if (params.limitToStandoffClass !== undefined) {
                paramsString += "&limitToStandoffClass=" + encodeURIComponent(params.limitToStandoffClass);
            }

        }

        return paramsString;
    }

    /**
     * URL encodes search by label params.
     *
     * @param offset offset to be used for paging, zero-based.
     * @param params parameters for search by label.
     */
    private static encodeLabelParams(offset: number, params?: ILabelSearchParams): string {

        let paramsString = `?offset=${offset}`;

        if (params !== undefined) {

            if (params.limitToResourceClass !== undefined) {
                paramsString += "&limitToResourceClass=" + encodeURIComponent(params.limitToResourceClass);
            }

            if (params.limitToProject !== undefined) {
                paramsString += "&limitToProject=" + encodeURIComponent(params.limitToProject);
            }

        }

        return paramsString;

    }

    /**
     * Performs a fulltext search.
     *
     * @param searchTerm the term to search for.
     * @param listNodeCache instance of `ListNodeCache` to be used.
     * @param offset offset to be used for paging, zero-based.
     * @param params parameters for fulltext search, if any.
     */
    doFulltextSearch(searchTerm: string, listNodeCache: ListNodeCache, offset = 0, params?: IFulltextSearchParams): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        return this.httpGet("/search/" + encodeURIComponent(searchTerm) + SearchEndpoint.encodeFulltextParams(offset, params)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, this.v2Endpoint.ontologyCache, listNodeCache, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Performs a fulltext search count query.
     *
     * @param searchTerm the term to search for.
     * @param offset offset to be used for paging, zero-based.
     * @param params parameters for fulltext search, if any.
     */
    doFulltextSearchCountQuery(searchTerm: string, offset = 0, params?: IFulltextSearchParams): Observable<CountQueryResponse | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        return this.httpGet("/search/count/" + encodeURIComponent(searchTerm) + SearchEndpoint.encodeFulltextParams(offset, params)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createCountQueryResponse(jsonldobj, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Performs a Gravsearch query.
     *
     * @param gravsearchQuery the given Gravsearch query.
     * @param listNodeCache instance of `ListNodeCache` to be used.
     */
    doExtendedSearch(gravsearchQuery: string, listNodeCache: ListNodeCache): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        // TODO: check if content-type have to be set to text/plain

        return this.httpPost("/searchextended", gravsearchQuery, "sparql").pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, this.v2Endpoint.ontologyCache, listNodeCache, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Performs a Gravsearch count query.
     *
     * @param gravsearchQuery the given Gravsearch query.
     */
    doExtendedSearchCountQuery(gravsearchQuery: string): Observable<CountQueryResponse | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        return this.httpPost("/searchextended/count", gravsearchQuery, "sparql").pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), map((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createCountQueryResponse(jsonldobj, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

    /**
     * Performs a search by label.
     *
     * @param searchTerm the label to search for.
     * @param listNodeCache instance of `ListNodeCache` to be used.
     * @param offset offset to be used for paging, zero-based.
     * @param params parameters for fulltext search, if any.
     */
    doSearchByLabel(searchTerm: string, listNodeCache: ListNodeCache, offset = 0, params?: ILabelSearchParams): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        return this.httpGet("/searchbylabel/" + encodeURIComponent(searchTerm) + SearchEndpoint.encodeLabelParams(offset, params)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, this.v2Endpoint.ontologyCache, listNodeCache, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

}
