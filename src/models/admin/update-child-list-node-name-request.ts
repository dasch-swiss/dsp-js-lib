import { JsonObject, JsonProperty } from "json2typescript";

/**
 * A request to update a name of a child node.
 * 
 * @category Model Admin
 */
@JsonObject("UpdateChildListNodeNameRequest")
export class UpdateChildListNodeNameRequest {

    /**
     * The updated child node name.
     */
    @JsonProperty("name", String)
    name: string = "";
}
