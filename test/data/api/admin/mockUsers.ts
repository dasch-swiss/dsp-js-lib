import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { PropertyMatchingRule } from "json2typescript/src/json2typescript/json-convert-enums";
import { AjaxResponse } from "rxjs/ajax";
import { ApiResponseData } from "../../../../src/models/api-response-data";
import { UsersResponse } from "../../../../src/models/admin/users-response";
import { UserResponse } from "../../../../src/models/admin/user-response";

import users from "./users/get-users-response.json";
import user from "./users/get-user-response.json";

export namespace MockUsers {

    const jsonConvert: JsonConvert = new JsonConvert(
        OperationMode.ENABLE,
        ValueCheckingMode.DISALLOW_NULL,
        false,
        PropertyMatchingRule.CASE_STRICT
    );

    export const mockUsers = (): ApiResponseData<UsersResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, {}));

        const usersRes = jsonConvert.serializeObject(users, UsersResponse);
        responseData.body = usersRes;
        return responseData as ApiResponseData<UsersResponse>;
    };

    export const mockUser = (): ApiResponseData<UserResponse> => {
        const responseData = ApiResponseData.fromAjaxResponse(new AjaxResponse({} as any, {} as any, {}));

        const userRes = jsonConvert.serializeObject(user, UserResponse);
        responseData.body = userRes;
        return responseData as ApiResponseData<UserResponse>;
    };

}
