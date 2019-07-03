export module MockAjaxCall {

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

}
