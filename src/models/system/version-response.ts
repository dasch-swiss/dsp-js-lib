import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Represents DSP's version
 *
 * @category Model System
 */
@JsonObject("VersionResponse")
export class VersionResponse {

    /**
     * pekkoHttp
     */
    @JsonProperty("pekkoHttp", String)
    pekkoHttp: string = "";

    /**
     * fuseki
     */
    @JsonProperty("fuseki", String)
    fuseki: string = "";

    /**
     * name
     */
    @JsonProperty("name", String)
    name: string = "";

    /**
     * scala
     */
    @JsonProperty("scala", String)
    scala: string = "";

    /**
     * sipi
     */
    @JsonProperty("sipi", String)
    sipi: string = "";

    /**
     * webapi
     */
    @JsonProperty("webapi", String)
    webapi: string = "";


}
