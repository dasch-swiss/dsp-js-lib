export namespace MockAjaxCall {

    /**
     * Mocks a successful response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockResponse = (mockData: string) => {

        return {
            status: 200,
            responseText: mockData
        };

    };

    /**
     * Mocks a unsuccessful 401 Not Authorized response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockNotAuthorizedResponse = (mockData: string) => {

        return {
            status: 401,
            responseText: mockData
        };

    };

    /**
     * Mocks a unsuccessful 404 Not Found response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockNotFoundResponse = (mockData: string) => {

        return {
            status: 404,
            responseText: mockData
        };

    };

}
