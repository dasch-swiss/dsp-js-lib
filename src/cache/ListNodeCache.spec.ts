import { KnoraApiConfig } from "../knora-api-config";
import { KnoraApiConnection } from "../knora-api-connection";
import { ListNodeCache } from "./ListNodeCache";
import { OntologyCache } from "./OntologyCache";

describe("OntologyCache", () => {

    const config = new KnoraApiConfig("http", "api.dasch.swiss", undefined, "", "", true);
    const knoraApiConnection = new KnoraApiConnection(config);

    let getListNodeSpy: jasmine.Spy;
    let getListSpy: jasmine.Spy;
    let listNodeCache: ListNodeCache;

    beforeEach(() => {




    });

});
