import { catchError, map } from "rxjs/operators";
import { ApiResponseData } from "../../../models/api-response-data";
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
    getVersion() {

        return this.httpGet("").pipe(
            map(ajaxResponse => {
                const versionResponse =  ApiResponseData.fromAjaxResponse(ajaxResponse, VersionResponse, this.jsonConvert);

                return versionResponse;
            }),
            catchError(error => this.handleError(error))
        );

    }

}
