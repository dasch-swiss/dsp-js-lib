import { ApiResponseData, ApiResponseError, UsersResponse } from "../../..";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { AdministrativePermissionResponse } from "../../../models/admin/administrative-permission-response";
import { Permission } from "../../../models/admin/permission";

describe("PermissionsEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {

        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getAdministrativePermission", () => {

        it("should return the administrative permissions", done => {

            const projectIri = "http://rdfh.ch/projects/00FF";

            const groupIri = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            const permissionType = "AdministrativePermission";

            knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermission(projectIri, groupIri, permissionType).subscribe(
                (response: ApiResponseData<AdministrativePermissionResponse>) => {

                    expect(response.body.administrative_permission.hasPermissions.length).toEqual(1);

                    const permissions = new Permission();
                    permissions.name = "ProjectResourceCreateAllPermission";

                    expect(response.body.administrative_permission.hasPermissions[0]).toEqual(permissions);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const users = require("../../../../test/data/api/admin/permissions/get-administrative-permission-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(users)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF/http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-admin%23ProjectMember?permissionType=AdministrativePermission");

            expect(request.method).toEqual("GET");

        });

    });

});