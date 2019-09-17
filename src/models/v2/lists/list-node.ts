import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../Constants";
import { IdConverter } from "../custom-converters/id-converter";
import { SubListNodeConverter } from "../custom-converters/sublist-node-converter";

@JsonObject("ListNode")
export class ListNode {

    @JsonProperty("@id", String)
    id: string = "";

    @JsonProperty(Constants.Label, String)
    label: string = "";

    @JsonProperty(Constants.IsRootNode, Boolean, true)
    isRootNode: boolean = false;

    @JsonProperty(Constants.HasRootNode, IdConverter, true)
    hasRootNode?: string = undefined;

    @JsonProperty(Constants.HasSubListNode, SubListNodeConverter, true)
    children: ListNode[] = [];
}
