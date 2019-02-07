import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs";

export class Test {

    hello(name: string): Observable<AjaxResponse> {

        return ajax.get("https://rotblau.app/users/");

    }

}