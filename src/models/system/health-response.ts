import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Represents Knora's state of health.
 *
 * @category Model System
 */
@JsonObject("HealthResponse")
export class HealthResponse {

    /**
     * Message
     */
    @JsonProperty("message", String)
    message: string = "";

    /**
     * Name
     */
    @JsonProperty("name", String)
    name: string = "";

    /**
     * Severity
     */
    @JsonProperty("severity", String)
    severity: string = "";

    /**
     * Status
     */
    @JsonProperty("status", String)
    status: string = "";

    /**
     * The version of webapi being used.
     */
    webapiVersion: string = "";

    /**
     * The version of akka being used.
     */
    akkaVersion: string = "";

}
