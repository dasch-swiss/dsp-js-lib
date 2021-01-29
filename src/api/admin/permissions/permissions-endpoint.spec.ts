import { MockAjaxCall } from "../../../../test/mockajaxcall";
import { KnoraApiConfig } from "../../../knora-api-config";
import { KnoraApiConnection } from "../../../knora-api-connection";
import { AdministrativePermissionResponse } from "../../../models/admin/administrative-permission-response";
import { AdministrativePermissionsResponse } from "../../../models/admin/administrative-permissions-response";
import { CreateAdministrativePermission } from "../../../models/admin/create-administrative-permission";
import { CreateDefaultObjectAccessPermission } from "../../../models/admin/create-default-object-access-permission";
import { CreatePermission } from "../../../models/admin/create-permission";
import { DefaultObjectAccessPermissionResponse } from "../../../models/admin/default-object-access-permission-response";
import { DefaultObjectAccessPermissionsResponse } from "../../../models/admin/default-object-access-permissions-response";
import { DeletePermissionResponse } from "../../../models/admin/delete-permission-response";
import { Permission } from "../../../models/admin/permission";
import { ProjectPermissionsResponse } from "../../../models/admin/project-permissions-response";
import { ApiResponseData } from "../../../models/api-response-data";

describe("PermissionsEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333, undefined, undefined, true);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getProjectPermissions", () => {

        it("should return all permissions", done => {

            const projectIri = "http://rdfh.ch/projects/00FF";

            knoraApiConnection.admin.permissionsEndpoint.getProjectPermissions(projectIri).subscribe(
                (response: ApiResponseData<ProjectPermissionsResponse>) => {

                    expect(response.body.permissions.length).toEqual(6);

                    expect(response.body.permissions[0].id).toEqual("http://rdfh.ch/permissions/00FF/a3");
                    expect(response.body.permissions[0].permissionType).toEqual("http://www.knora.org/ontology/knora-admin#AdministrativePermission");

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const projectPermissionsResponse = require("../../../../test/data/api/admin/permissions/get-permissions-for-project-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(projectPermissionsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF");

            expect(request.method).toEqual("GET");

        });

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

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
            const projectIri = "http://rdfh.ch/projects/0001";

            const adminPermission = new CreateAdministrativePermission();
            adminPermission.forGroup = groupIri;
            adminPermission.forProject = projectIri;

            adminPermission.hasPermissions = [permission];

            knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission).subscribe(
                (response: ApiResponseData<AdministrativePermissionResponse>) => {

                    // TODO: remove this bad hack once test data is stable
                    expect(response.body.administrative_permission.id).toBeDefined(); //.toEqual("http://rdfh.ch/permissions/0001/cYBzgOcHSR6kNocj5osOJA");
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

        it("should attempt to create an administrative permission without a project property", () => {

            const permission = new CreatePermission();
            permission.name = "ProjectAdminGroupAllPermission";

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";

            const adminPermission = new CreateAdministrativePermission();
            adminPermission.forGroup = groupIri;

            adminPermission.hasPermissions = [permission];

            expect(() =>
                knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission)
            ).toThrow(new Error("Group and project are required when creating a new administrative permission."));

        });

        it("should attempt to create an administrative permission without a group property", () => {

            const permission = new CreatePermission();
            permission.name = "ProjectAdminGroupAllPermission";

            const projectIri = "http://rdfh.ch/projects/0001";

            const adminPermission = new CreateAdministrativePermission();
            adminPermission.forProject = projectIri;

            adminPermission.hasPermissions = [permission];

            expect(() =>
                knoraApiConnection.admin.permissionsEndpoint.createAdministrativePermission(adminPermission)
            ).toThrow(new Error("Group and project are required when creating a new administrative permission."));

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

    describe("Method getDefaultObjectAccessPermissions", () => {

        it("should return all default project access permissions", done => {

            const projectIri = "http://rdfh.ch/projects/00FF";

            knoraApiConnection.admin.permissionsEndpoint.getDefaultObjectAccessPermissions(projectIri).subscribe(
                (response: ApiResponseData<DefaultObjectAccessPermissionsResponse>) => {

                    expect(response.body.defaultObjectAccessPermissions.length).toBe(3);

                    expect(response.body.defaultObjectAccessPermissions[0].forProject).toBe("http://rdfh.ch/projects/00FF");
                    expect(response.body.defaultObjectAccessPermissions[0].forGroup).toBe("http://www.knora.org/ontology/knora-admin#ProjectMember");
                    expect(response.body.defaultObjectAccessPermissions[0].id).toBe("http://rdfh.ch/permissions/00FF/d1");
                    expect(response.body.defaultObjectAccessPermissions[0].hasPermissions.length).toBe(3);

                    done();
                });

            const request = jasmine.Ajax.requests.mostRecent();

            const defaultObjectAccessPermissionsResponse = require("../../../../test/data/api/admin/permissions/get-defaultObjectAccess-permissions-for-project-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(defaultObjectAccessPermissionsResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/doap/http%3A%2F%2Frdfh.ch%2Fprojects%2F00FF");

            expect(request.method).toEqual("GET");

        });

    });

    describe("Method createDefaultObjectAccessPermission", () => {

        it("should create a default object access permission", done => {

            const permission = new CreatePermission();
            permission.name = "D";
            permission.permissionCode = 7;
            permission.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
            const projectIri = "http://rdfh.ch/projects/0001";

            const defObjAccPermission = new CreateDefaultObjectAccessPermission();
            defObjAccPermission.forGroup = groupIri;
            defObjAccPermission.forProject = projectIri;

            defObjAccPermission.hasPermissions = [permission];

            knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(defObjAccPermission).subscribe(
                (response: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {

                    expect(response.body.defaultObjectAccessPermission.forGroup).toEqual("http://rdfh.ch/groups/0001/thing-searcher");
                    expect(response.body.defaultObjectAccessPermission.forProject).toEqual("http://rdfh.ch/projects/0001");
                    // TODO: remove this bad hack once test data is stable
                    expect(response.body.defaultObjectAccessPermission.id).toBeDefined(); //.toEqual("http://rdfh.ch/permissions/0001/7fKkJ8DKTdew5x0139W78g");
                    expect(response.body.defaultObjectAccessPermission.hasPermissions.length).toBe(1);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const permissionCreationResponse = require("../../../../test/data/api/admin/permissions/create-defaultObjectAccess-permission-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(permissionCreationResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/doap");

            expect(request.method).toEqual("POST");

            const payload = require("../../../../test/data/api/admin/permissions/create-defaultObjectAccess-permission-request.json");

            expect(request.data()).toEqual(payload);
        });

        it("should attempt to create a default object access permission without a project property", () => {

            const permission = new CreatePermission();
            permission.name = "D";
            permission.permissionCode = 7;
            permission.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";

            const defObjAccPermission = new CreateDefaultObjectAccessPermission();
            defObjAccPermission.forGroup = groupIri;

            defObjAccPermission.hasPermissions = [permission];

            expect(() =>
                knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(defObjAccPermission)
            ).toThrow(new Error("Project is required when creating a new default object access permission."));

        });

        it("should attempt to create a default object access permission submitting a group and a property", () => {

            const permission = new CreatePermission();
            permission.name = "D";
            permission.permissionCode = 7;
            permission.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
            const projectIri = "http://rdfh.ch/projects/0001";

            const defObjAccPermission = new CreateDefaultObjectAccessPermission();
            defObjAccPermission.forGroup = groupIri;
            defObjAccPermission.forProject = projectIri;
            defObjAccPermission.forProperty = "myProp";

            defObjAccPermission.hasPermissions = [permission];

            expect(() =>
                knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(defObjAccPermission)
            ).toThrow(new Error("Invalid combination of properties for creation of new default object access permission."));

        });

        it("should attempt to create a default object access permission submitting a group and a resource class", () => {

            const permission = new CreatePermission();
            permission.name = "D";
            permission.permissionCode = 7;
            permission.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            const groupIri = "http://rdfh.ch/groups/0001/thing-searcher";
            const projectIri = "http://rdfh.ch/projects/0001";

            const defObjAccPermission = new CreateDefaultObjectAccessPermission();
            defObjAccPermission.forGroup = groupIri;
            defObjAccPermission.forProject = projectIri;
            defObjAccPermission.forResourceClass = "myResclass";

            defObjAccPermission.hasPermissions = [permission];

            expect(() =>
                knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(defObjAccPermission)
            ).toThrow(new Error("Invalid combination of properties for creation of new default object access permission."));

        });

        it("should create an  default object access permission with a custom Iri", done => {

            const permission = new CreatePermission();
            permission.name = "D";
            permission.permissionCode = 7;
            permission.additionalInformation = "http://www.knora.org/ontology/knora-admin#ProjectMember";

            const projectIri = "http://rdfh.ch/projects/00FF";

            const defObjAccPermission = new CreateDefaultObjectAccessPermission();
            defObjAccPermission.forProject = projectIri;
            defObjAccPermission.forResourceClass = "http://www.knora.org/ontology/00FF/images#bild";
            defObjAccPermission.id = "http://rdfh.ch/permissions/00FF/DOAP-with-customIri";
            defObjAccPermission.hasPermissions = [permission];

            knoraApiConnection.admin.permissionsEndpoint.createDefaultObjectAccessPermission(defObjAccPermission).subscribe(
                (response: ApiResponseData<DefaultObjectAccessPermissionResponse>) => {

                    expect(response.body.defaultObjectAccessPermission.forProject).toEqual("http://rdfh.ch/projects/00FF");
                    expect(response.body.defaultObjectAccessPermission.id).toEqual("http://rdfh.ch/permissions/00FF/DOAP-with-customIri");
                    expect(response.body.defaultObjectAccessPermission.hasPermissions.length).toBe(1);

                    done();
                }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            const permissionCreationResponse = require("../../../../test/data/api/admin/permissions/create-defaultObjectAccess-permission-withCustomIRI-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify(permissionCreationResponse)));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/doap");

            expect(request.method).toEqual("POST");

            const payload = require("../../../../test/data/api/admin/permissions/create-defaultObjectAccess-permission-withCustomIRI-request.json");

            expect(request.data()).toEqual(payload);
        });

    });

    describe("Method deletePermission", () => {

        it("should delete a permission", done => {

            knoraApiConnection.admin.permissionsEndpoint.deletePermission("myPermission").subscribe(
                (response: ApiResponseData<DeletePermissionResponse>) => {
                  expect(response.body.deleted).toBeTrue();
                  done();
              }
            );

            const request = jasmine.Ajax.requests.mostRecent();

            // const permissionCreationResponse = require("../../../../test/data/api/admin/permissions/create-defaultObjectAccess-permission-withCustomIRI-response.json");

            request.respondWith(MockAjaxCall.mockResponse(JSON.stringify({
                permissionIri: "myPermission",
                deleted: true
            })));

            expect(request.url).toBe("http://localhost:3333/admin/permissions/myPermission");

            expect(request.method).toEqual("DELETE");

        });

    });

});
