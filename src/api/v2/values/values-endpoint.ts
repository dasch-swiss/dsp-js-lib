import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ApiResponseError } from "../../..";
import { UpdateResource } from "../../../models/v2/resources/update/update-resource";
import { CreateValue } from "../../../models/v2/resources/values/create/create-value";
import { UpdateValue } from "../../../models/v2/resources/values/update/update-value";
import { UpdateValueResponse } from "../../../models/v2/resources/values/update/update-value-response";
import { Endpoint } from "../../endpoint";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require("jsonld/dist/jsonld.js");

/**
 * Handles requests to the values route of the Knora API.
 */
export class ValuesEndpoint extends Endpoint {

    updateValue(resource: UpdateResource<UpdateValue>): Observable<UpdateValueResponse | ApiResponseError> {

        const res = this.jsonConvert.serializeObject(resource);

        const val = this.jsonConvert.serializeObject(resource.value);

        res[resource.property] = val;

        return this.httpPut("", res).pipe(
            mergeMap((ajaxResponse: AjaxResponse) => {
                // console.log(JSON.stringify(ajaxResponse.response));
                // TODO: @rosenth Adapt context object
                // TODO: adapt getOntologyIriFromEntityIri
                return jsonld.compact(ajaxResponse.response, {});
            }),
            map(jsonldobj => {
                return this.jsonConvert.deserializeObject(jsonldobj, UpdateValueResponse);
            }),
            catchError(error => this.handleError(error))
        );
    }

    createValue(resource: UpdateResource<CreateValue>) {

    }

    deleteValue() {

    }
}
