import {KnoraApiConfig} from '../../../knora-api-config';
import {KnoraApiConnection} from '../../../knora-api-connection';
import {UsersResponse} from '../../../models/admin/users-response';
import {ApiResponseData} from '../../../models/api-response-data';

describe("UsersEndpoint", () => {

    const config = new KnoraApiConfig("http", "localhost", 3333);
    const knoraApiConnection = new KnoraApiConnection(config);

    beforeEach(() => {

        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe("Method getUsers", () => {

        it("should return all users", () => {

            knoraApiConnection.admin.users.getUsers().subscribe((response: ApiResponseData<UsersResponse>) => {
                expect(response.body.users.length).toEqual(19);

                expect(response.body.users[0].familyName).toEqual('Duckmann');
            });

            const request = jasmine.Ajax.requests.mostRecent();

            const users = require('../../../../test/data/api/admin/users/get.json');

            request.respondWith({
                status: 200,
                responseText: JSON.stringify(users)
            });

            expect(request.url).toBe('http://localhost:3333/admin/users');

        });

    });

});
