import { JsonConvert, OperationMode, PropertyMatchingRule, ValueCheckingMode } from "json2typescript";
import { AjaxResponse } from "rxjs/ajax";
import { UserResponse } from "../../../../src/models/admin/user-response";
import { UsersResponse } from "../../../../src/models/admin/users-response";
import { ApiResponseData } from "../../../../src/models/api-response-data";
import user from "./users/get-user-response.json";
import users from "./users/get-users-response.json";

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
