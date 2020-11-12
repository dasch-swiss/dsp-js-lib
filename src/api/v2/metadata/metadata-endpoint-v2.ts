import { Observable } from "rxjs";
import { KnoraApiConfig } from "../../../knora-api-config";
import { Endpoint } from "../../endpoint";

/**
 * Handles requests to the metadata route of the Knora API
 */
export class MetadataEndpointV2 extends Endpoint {

    /**
     * Constructor
     * @param knoraApiConfig
     * @param path
     */
    constructor(protected readonly knoraApiConfig: KnoraApiConfig, protected readonly path: string) {
        super(knoraApiConfig, path);
    }

    updateMetadata(projectIri: string): Observable<any> {
        const metadata = "";
        return this.httpPut("", metadata);
    }

    getMetadata(projectIri: string): Observable<any> {
        return this.httpGet("");
    }
}