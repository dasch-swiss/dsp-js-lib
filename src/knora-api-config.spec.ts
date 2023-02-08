import { KnoraApiConfig } from "./knora-api-config";

describe("Test class KnoraApiConfig", () => {

    describe("Test method constructor()", () => {

        interface IConstructorParams {
            apiProtocol: "http" | "https";
            apiHost: string;
            apiPort?: number | null;
            apiPath?: string;
            jsonWebToken?: string;
            logErrors?: boolean;
            zioPrefix?: "/zio" | ":5555";
            zioEndpoints?: string[]
        }

        it("should verify parameters", () => {

            const params: IConstructorParams[] = [
                {
                    apiProtocol: "http",
                    apiHost: "localhost"
                },
                {
                    apiProtocol: "http",
                    apiHost: "localhost",
                    apiPort: 80
                },
                {
                    apiProtocol: "https",
                    apiHost: "localhost"
                },
                {
                    apiProtocol: "https",
                    apiHost: "localhost",
                    apiPort: 443
                },
                {
                    apiProtocol: "http",
                    apiHost: "localhost",
                    apiPort: 1234,
                    apiPath: "/api",
                    jsonWebToken: "GAGA",
                    zioPrefix: "/zio",
                    zioEndpoints: ['/admin/projects'],
                },
                {
                    apiProtocol: "http",
                    apiHost: "localhost",
                    apiPort: 1234,
                    apiPath: "/api",
                    jsonWebToken: "GAGA",
                    logErrors: false,
                    zioPrefix: ":5555",
                    zioEndpoints: ['/admin/projects'],
                },
                {
                    apiProtocol: "http",
                    apiHost: "localhost",
                    apiPort: 1234,
                    apiPath: "/api",
                    jsonWebToken: "GAGA",
                    logErrors: true,
                    zioPrefix: ":5555",
                    zioEndpoints: ['/admin/projects'],
                }
            ];

            params.forEach(({apiProtocol, apiHost, apiPort, apiPath, jsonWebToken, logErrors, zioPrefix, zioEndpoints}) => {

                const config = new KnoraApiConfig(apiProtocol, apiHost, apiPort, apiPath, jsonWebToken, logErrors , zioPrefix, zioEndpoints);

                expect(config).toEqual(jasmine.any(KnoraApiConfig));
                expect(config.apiProtocol).toEqual(apiProtocol);
                expect(config.apiHost).toEqual(apiHost);

                if (apiProtocol === KnoraApiConfig.PROTOCOL_HTTP &&
                    apiPort === KnoraApiConfig.DEFAULT_PORT_HTTP) {
                    expect(config.apiPort).toEqual(null);
                } else if (apiProtocol === KnoraApiConfig.PROTOCOL_HTTPS &&
                    apiPort === KnoraApiConfig.DEFAULT_PORT_HTTPS) {
                    expect(config.apiPort).toEqual(null);
                } else {
                    expect(config.apiPort).toEqual(apiPort === undefined ? null : apiPort);
                }

                expect(config.apiPath).toEqual(apiPath === undefined ? "" : apiPath);
                expect(config.jsonWebToken).toEqual(jsonWebToken === undefined ? "" : jsonWebToken);
                expect(config.logErrors).toEqual(logErrors === undefined ? false : logErrors);
                expect(config.zioPrefix).toEqual(zioPrefix === undefined ? "/zio" : zioPrefix)
                expect(config.zioEndpoints).toEqual(zioEndpoints === undefined ? [] : zioEndpoints)

            });

        });

    });

    describe("Test property apiUrl", () => {

        interface IApiUrlData {
            param: {
                apiProtocol: "http" | "https",
                apiHost: string,
                apiPort?: number | null,
                apiPath?: string
            };
            result: string;
        }

        it("should return correct value", () => {

            const data: IApiUrlData[] = [
                {
                    param: {apiProtocol: "http", apiHost: "localhost"},
                    result: "http://localhost"
                },
                {
                    param: {apiProtocol: "http", apiHost: "localhost", apiPort: 80},
                    result: "http://localhost"
                },
                {
                    param: {apiProtocol: "https", apiHost: "localhost"},
                    result: "https://localhost"
                },
                {
                    param: {apiProtocol: "https", apiHost: "localhost", apiPort: 443},
                    result: "https://localhost"
                },
                {
                    param: {apiProtocol: "https", apiHost: "domain.com", apiPort: 1234},
                    result: "https://domain.com:1234"
                },
                {
                    param: {apiProtocol: "https", apiHost: "domain.com", apiPort: 1234, apiPath: "/api"},
                    result: "https://domain.com:1234/api"
                },
                {
                    param: {apiProtocol: "https", apiHost: "domain.com", apiPort: 1234, apiPath: "/api"},
                    result: "https://domain.com:1234/api"
                }
            ];

            data.forEach(({param, result}) => {
                const config = new KnoraApiConfig(param.apiProtocol, param.apiHost, param.apiPort, param.apiPath);
                expect(config.apiUrl).toBe(result);
            });

        });

    });

    describe("Test property zioApiUrl", () => {

        interface IZioApiUrlData {
            param: {
                apiProtocol: "http" | "https",
                apiHost: string,
                zioPrefix?: "/zio" | ":5555",
                apiPath?: string,
            };
            result: string;
        }

        it("should return correct value", () => {

            const data: IZioApiUrlData[] = [
                {
                    param: {apiProtocol: "http", apiHost: "domain.com", zioPrefix: "/zio"},
                    result: "http://domain.com/zio"
                },
                {
                    param: {apiProtocol: "http", apiHost: "domain.com", zioPrefix: ":5555"},
                    result: "http://domain.com:5555"
                },
                {
                    param: {apiProtocol: "http", apiHost: "domain.com", zioPrefix: "/zio", apiPath: "/api"},
                    result: "http://domain.com/zio/api"
                },
                {
                    param: {apiProtocol: "http", apiHost: "domain.com", zioPrefix: ":5555", apiPath: "/api"},
                    result: "http://domain.com:5555/api"
                }
            ];

            data.forEach(({param, result}) => {
                const config = new KnoraApiConfig(param.apiProtocol, param.apiHost, null, param.apiPath, undefined, false, param.zioPrefix);
                expect(config.zioApiUrl).toBe(result);
            });

        });

    });

});
