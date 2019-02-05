import axios from "axios";

export class Test {

    hello(name: string): string {

        /*axios.get("https://api-test.app/")
            .then(data => console.log("DATA" + data))
            .catch(error => console.error("ERROR" + error));*/

        return "Hello, " + name;

    }

}