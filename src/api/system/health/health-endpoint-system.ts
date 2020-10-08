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
            map(ajaxResponse => ApiResponseData.fromAjaxResponse(ajaxResponse, HealthResponse, this.jsonConvert)),
            catchError(error => this.handleError(error))
        );
    
    }
    
}
