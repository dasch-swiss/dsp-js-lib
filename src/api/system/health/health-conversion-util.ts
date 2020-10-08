import { ApiResponseData } from "../../../models/api-response-data";
import { HealthResponse } from "../../../models/system/health-response";

export namespace HealthConversionUtil {

    /**
     * Adds the versions of webapi and akka to the health response.
     * Throws an error if the header information received from Knora is invalid.
     *
     * @param healthResponse the health response reveived from Knora.
     * @param serverHeaderParam the server header param, if any.
     */
    export const addHeaderInfoToHealthResponse = (healthResponse: ApiResponseData<HealthResponse>, serverHeaderParam: string | null) => {
        if (serverHeaderParam !== null) {
            const versions = serverHeaderParam.split(" ");

            if (versions.length === 2) {
                healthResponse.body.webapiVersion = versions[0];
                healthResponse.body.akkaVersion = versions[1];
                return healthResponse;
            } else {
                throw new Error(`Could not parse server header param ${serverHeaderParam}.`);
            }
        } else {
            throw new Error("Could not get server header param.");
        }
    };

}
