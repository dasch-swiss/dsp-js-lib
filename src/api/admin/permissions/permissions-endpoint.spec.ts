import { AdministrativePermissionsResponse } from "../../../models/admin/administrative-permissions-response";
import { CreatePermission } from "../../../models/admin/create-permission";
import { ApiResponseData } from "../../../models/api-response-data";
import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { AdministrativePermissionResponse } from "../../../models/admin/administrative-permission-response";
import { Permission } from "../../../models/admin/permission";
import { CreateAdministrativePermission } from "../../../models/admin/create-administrative-permission";

describe("PermissionsEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getAdministrativePermissions", () => {

        it("should return all administrative permissions", done => {

            const projectIri = "http://rdfh.ch/projects/00FF";

            knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermissions(projectIri).subscribe(
                (response: ApiResponseData<AdministrativePermissionsResponse>) => {

                    expect(response.body.administrative_permissions.length).toEqual(3);

                    expect(response.body.administrative_permissions[0].hasPermissions.length).toEqual(1);

                    const permissions = new Permission();
                    permissions.name = "ProjectResourceCreateAllPermission";

                    expect(response.body.administrative_permissions[0].hasPermissions[0]).toEqual(permissions);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const permissionsResponse = require("../../../../test/data/api/admin/permissions/get-administrative-permissions-for-project-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(permissionsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/ap/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method getAdministrativePermission", () => {

        it("should return an administrative permission", done => {

            const projectIri = "http://rdfh.ch/projects/00FF";

            const groupIri = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            knoraApiConnection.admin.permissionsEndpoint.getAdministrativePermission(projectIri, groupIri).subscribe(
                (response: ApiResponseData<AdministrativePermissionResponse>) => {

                    expect(response.body.administrative_permission.hasPermissions.length).toEqual(1);

                    const permissions = new Permission();
                    permissions.name = "ProjectResourceCreateAllPermission";

                    expect(response.body.administrative_permission.hasPermissions[0]).toEqual(permissions);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const permissionResponse = require("../../../../test/data/api/admin/permissions/get-administrative-permission-for-project-group-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(permissionResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/ap/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF/http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-admin%23ProjectMember");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method createAdministrativePermission", () => {

        it("should create an administrative permission", done => {

            const permission = new CreatePermission();
            permission.name = "ProjectAdminGroupAllPermission";
            permission.permissionCode = null;
            permission.additionalInformation = null;

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
            const projectIri = "http://rdfh.ch/projects/0001";

            const adminPermission = new CreateAdministrativePermission();
            adminPermission.forGroup = groupIri;
            adminPermission.forProject = projectIri;

            adminPermission.hasPermissions = [permission];

            knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission).subscribe(
                (response: ApiResponseData<AdministrativePermissionResponse>) => {

                    expect(response.body.administrative_permission.id).toEqual("http://rdfh.ch/permissions/0001/mFlyBEiMQtGzwy_hK0M-Ow");
                    expect(response.body.administrative_permission.forGroup).toEqual("http://rdfh.ch/groups/0001/thing-searcher");
                    expect(response.body.administrative_permission.forProject).toEqual("http://rdfh.ch/projects/0001");
                    expect(response.body.administrative_permission.hasPermissions.length).toEqual(1);
                    expect(response.body.administrative_permission.hasPermissions[0].name).toEqual("ProjectAdminGroupAllPermission");

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const permissionCreationResponse = require("../../../../test/data/api/admin/permissions/create-administrative-permission-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(permissionCreationResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/ap");

            expect(request.method).toEqual("POST");

            const payload = require("../../../../test/data/api/admin/permissions/create-administrative-permission-request.json");

            expect(request.data()).toEqual(payload);
        });

        it("should create an administrative permission with a custom Iri", done => {

            const permission = new CreatePermission();
            permission.name = "ProjectAdminGroupAllPermission";
            permission.permissionCode = null;
            permission.additionalInformation = null;

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
            const projectIri = "http://rdfh.ch/projects/0001";

            const adminPermission = new CreateAdministrativePermission();
            adminPermission.forGroup = groupIri;
            adminPermission.forProject = projectIri;
            adminPermission.id = "http://rdfh.ch/permissions/0001/AP-with-customIri";

            adminPermission.hasPermissions = [permission];

            knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission).subscribe(
                (response: ApiResponseData<AdministrativePermissionResponse>) => {

                    expect(response.body.administrative_permission.id).toEqual("http://rdfh.ch/permissions/0001/AP-with-customIri");
                    expect(response.body.administrative_permission.forGroup).toEqual("http://rdfh.ch/groups/0001/thing-searcher");
                    expect(response.body.administrative_permission.forProject).toEqual("http://rdfh.ch/projects/0001");
                    expect(response.body.administrative_permission.hasPermissions.length).toEqual(1);
                    expect(response.body.administrative_permission.hasPermissions[0].name).toEqual("ProjectAdminGroupAllPermission");

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const permissionCreationResponse = require("../../../../test/data/api/admin/permissions/create-administrative-permission-withCustomIRI-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(permissionCreationResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/ap");

            expect(request.method).toEqual("POST");

            const payload = require("../../../../test/data/api/admin/permissions/create-administrative-permission-withCustomIRI-request.json");

            expect(request.data()).toEqual(payload);
        });

    });

});
