import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { AjaxResponse } from "rxjs/ajax";
import { ApiResponseData } from "../../../../src/models/api-response-data";
import { HealthResponse } from "../../../../src/models/system/health-response";

import maintenance from "./health/maintenance-mode-response.json";
import running from "./health/running-response.json";
import stopped from "./health/stopped-response.json";

export namespace MockHealth {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const mockMaintenance = (): ApiResponseData<HealthResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, { url: '', method: 'GET', async: true, headers: {}, timeout: 0, crossDomain: false, responseType: 'json', withCredentials: false }));

        const healthRes = jsonConvert.serializeObject(maintenance, HealthResponse);
        responseData.body = healthRes;
        return responseData as ApiResponseData<HealthResponse>;
    };

    export const mockRunning = (): ApiResponseData<HealthResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, { url: '', method: 'GET', async: true, headers: {}, timeout: 0, crossDomain: false, responseType: 'json', withCredentials: false }));

        const healthRes = jsonConvert.serializeObject(running, HealthResponse);
        responseData.body = healthRes;
        return responseData as ApiResponseData<HealthResponse>;
    };

    export const mockStopped = (): ApiResponseData<HealthResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, { url: '', method: 'GET', async: true, headers: {}, timeout: 0, crossDomain: false, responseType: 'json', withCredentials: false }));

        const healthRes = jsonConvert.serializeObject(stopped, HealthResponse);
        responseData.body = healthRes;
        return responseData as ApiResponseData<HealthResponse>;
    };
}
