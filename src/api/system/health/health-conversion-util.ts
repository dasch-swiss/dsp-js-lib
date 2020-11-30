import { ApiResponseData } from "../../../models/api-response-data";
import { HealthResponse } from "../../../models/system/health-response";

/**
 * @category Internal
 */
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
            // e.g., "webapi/v13.0.0-rc.16 akka-http/10.1.12"
            const versions = serverHeaderParam.split(" ");

            if (versions.length === 2) {
                healthResponse.body.webapiVersion = getVersionFromString(versions[0]);
                healthResponse.body.akkaVersion = getVersionFromString(versions[1]);
                return healthResponse;
            } else {
                throw new Error(`Could not parse server header param ${serverHeaderParam}.`);
            }
        } else {
            throw new Error("Could not get server header param.");
        }
    };

    /**
     * Gets the version info from the info string.
     * Throws an error if the info string is invalid.
     *
     * @param infoString the string containing the version information.
     */
    const getVersionFromString = (infoString: string) => {
        // e.g., "webapi/v13.0.0-rc.16"
        const parts = infoString.split("/");
        if (parts.length === 2) {
            return parts[1];
        } else {
            throw new Error(`Invalid version string ${infoString}.`);
        }
    };

}
