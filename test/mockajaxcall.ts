export namespace MockAjaxCall {

    /**
     * Mocks a successful response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockResponse = (mockData: string) => {

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(mockData);
        } catch (e) {
            // If parsing fails, use the raw string
            parsedResponse = mockData;
        }

        return {
            status: 200,
            responseText: mockData,
            response: parsedResponse
        };

    };

    /**
     * Mocks a unsuccessful 401 Not Authorized response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockNotAuthorizedResponse = (mockData: string = JSON.stringify({})) => {

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(mockData);
        } catch (e) {
            // If parsing fails, use the raw string
            parsedResponse = mockData;
        }

        return {
            status: 401,
            responseText: mockData,
            response: parsedResponse
        };

    };

    /**
     * Mocks a unsuccessful 404 Not Found response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockNotFoundResponse = (mockData: string = JSON.stringify({})) => {

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(mockData);
        } catch (e) {
            // If parsing fails, use the raw string
            parsedResponse = mockData;
        }

        return {
            status: 404,
            responseText: mockData,
            response: parsedResponse
        };

    };

    /**
     * Mocks a unsuccessful 400 Bad Request response to an Ajax call.
     *
     * @param mockData mocked data to be returned in the successful response's body.
     */
    export const mockBadRequestResponse = (mockData: string = JSON.stringify({})) => {

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(mockData);
        } catch (e) {
            // If parsing fails, use the raw string
            parsedResponse = mockData;
        }

        return {
            status: 400,
            responseText: mockData,
            response: parsedResponse
        };

    };

}
