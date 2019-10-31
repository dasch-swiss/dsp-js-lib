/**
 * Handles requests to the values route of the Knora API.
 */
import { UpdateResource } from "../../../models/v2/resources/update/update-resource";
import { CreateValue } from "../../../models/v2/resources/values/create/create-value";
import { UpdateValue } from "../../../models/v2/resources/values/update/update-value";
import { Endpoint } from "../../endpoint";

export class ValuesEndpoint extends Endpoint {

    updateValue(resource: UpdateResource<UpdateValue>) {

        const res = this.jsonConvert.serializeObject(resource);

        const val = this.jsonConvert.serializeObject(resource.value);

        res[resource.property] = val;

        console.log(res);

        return this.httpPut("", res);
    }

    createValue(resource: UpdateResource<CreateValue>) {

    }

    deleteValue() {

    }
}
