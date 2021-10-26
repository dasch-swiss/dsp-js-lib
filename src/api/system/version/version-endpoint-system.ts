import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { VersionResponse } from "../../../models/system/version-response";
import { Endpoint } from "../../endpoint";

/**
 * An endpoint to get DSP's version.
 *
 * @category Endpoint System
 */
export class VersionEndpointSystem extends Endpoint {

    /**
     * Returns DSP's version.
     */
    getVersion(): Observable<ApiResponseData<VersionResponse> | ApiResponseError> {

        return this.httpGet("").pipe(
            map(ajaxResponse => {
                const versionResponse =  ApiResponseData.fromAjaxResponse(ajaxResponse, VersionResponse, this.jsonConvert);

                return versionResponse;
                // const serverHeader = ajaxResponse.xhr.getResponseHeader("server");
                // return HealthConversionUtil.addHeaderInfoToHealthResponse(healthResponse, serverHeader);
            }),
            catchError(error => this.handleError(error))
        );

    }

}
