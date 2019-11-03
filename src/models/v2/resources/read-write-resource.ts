import { JsonObject, JsonProperty } from "json2typescript";
import { BaseResource } from "./base-resource";

@JsonObject("ReadWriteResource")
export abstract class ReadWriteResource extends BaseResource {

    @JsonProperty("@id", String)
    id: string = "";

}
