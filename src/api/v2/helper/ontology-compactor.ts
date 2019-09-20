import { Constants } from "../../../models/v2/Constants";

const jsonld = require("jsonld/dist/jsonld.js");

export class OntologyCompactor {
    private static instance: OntologyCompactor;
    private context: {[index: string]: string};

    private constructor() {
        this.context = {};
        this.context[Constants.RdfShort] = Constants.Rdf;
        this.context[Constants.RdfsShort] = Constants.Rdfs;
        this.context[Constants.OwlShort] = Constants.Owl;
        this.context[Constants.KnoraApiV2Short] = Constants.KnoraApiV2 + Constants.Delimiter;
        this.context[Constants.SalsahGuiShort] = Constants.SalsahGui + Constants.Delimiter;
    }

    addPrefix(shortname: string, iri: string) {
        this.context[shortname] = iri;
    }

    static getOntologyCompactor(): OntologyCompactor {
        if (!OntologyCompactor.instance) {
            OntologyCompactor.instance = new OntologyCompactor();
        }

        return OntologyCompactor.instance;
    }

    compact(jsonldobj: string) {
        console.log(this.context);
        return jsonld.compact(jsonldobj, this.context);
    }
}
