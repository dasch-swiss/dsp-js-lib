import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { HealthResponse } from "../../../models/system/health-response";
import { Endpoint } from "../../endpoint";

/**
 * An endpoint to get Knora's state of health.
 */
export class HealthEndpointSystem extends Endpoint {

    /**
     * Returns Knora's state of health.
     */
    getHealth(): Observable<ApiResponseData<HealthResponse> | ApiResponseError> {

        return this.httpGet("").pipe(
            map(ajaxResponse => {
                const healthResponse =  ApiResponseData.fromAjaxResponse(ajaxResponse, HealthResponse, this.jsonConvert);
                const serverHeader = ajaxResponse.xhr.getResponseHeader("server");
                if (serverHeader !== null) {
                    const versions = serverHeader.split(" ");

                    if (versions.length === 2) {
                        healthResponse.body.webapiVersion = versions[0];
                        healthResponse.body.akkaVersion = versions[1];
                        return healthResponse;
                    } else {
                        throw new Error(`Could not parse server header param ${serverHeader}.`);
                    }
                } else {
                    throw new Error("Could not get server header param.");
                }
            }),
            catchError(error => this.handleError(error))
        );

    }

}
