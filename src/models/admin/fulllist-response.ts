import { JsonObject, JsonProperty } from "json2typescript";

import { FullList } from "./lists";

/**
 * A response providing a single user.
 */
@JsonObject("FullListResponse")
export class FullListResponse {

    /**
     * The list returned in a FullListResponse.
     */
    @JsonProperty("list", FullList)
    list: FullList = new FullList();

}
