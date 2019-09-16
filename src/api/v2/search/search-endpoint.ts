import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError, OntologyCache } from "../../..";
import { ReadResource } from "../../../models/v2/resources/read-resource";
import { ResourcesConversionUtil } from "../../../models/v2/resources/ResourcesConversionUtil";
import { CountQueryResponse } from "../../../models/v2/search/count-query-response";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

export interface IFulltextSearchParams {

    limitToResourceClass?: string;

    limitToProject?: string;

    limitToStandoffClass?: string;

}

export interface ILabelSearchParams {

    limitToResourceClass?: string;

    limitToProject?: string;

}

export class SearchEndpoint extends Endpoint {

    private static encodeFulltextParams(offset: number, params?: IFulltextSearchParams) {

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

    private static encodeLabelParams(offset: number, params?: ILabelSearchParams) {

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

    doFulltextSearch(searchTerm: string, ontologyCache: OntologyCache, offset = 0, params?: IFulltextSearchParams): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        return this.httpGet("/search/" + encodeURIComponent(searchTerm) + SearchEndpoint.encodeFulltextParams(offset, params)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, ontologyCache, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

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

    doSearchByLabel(searchTerm: string, ontologyCache: OntologyCache, offset = 0, params?: ILabelSearchParams): Observable<ReadResource[] | ApiResponseError> {
        // TODO: Do not hard-code the URL and http call params, generate this from Knora

        return this.httpGet("/searchbylabel/" + encodeURIComponent(searchTerm) + SearchEndpoint.encodeLabelParams(offset, params)).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }), mergeMap((jsonldobj: object) => {
                // console.log(JSON.stringify(jsonldobj));
                return ResourcesConversionUtil.createReadResourceSequence(jsonldobj, ontologyCache, this.jsonConvert);
            }),
            catchError(error => {
                return this.handleError(error);
            })
        );
    }

}
