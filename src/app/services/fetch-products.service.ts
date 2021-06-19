import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FetchProductService {
    private url = "http://demo4904588.mockable.io/menu.json";

    constructor(private http: Http) {
        window.console.log('FetchProductService.constructor');
    }

    getData() {
        window.console.log('FetchProductService.getData');
        return this.http.get(this.url);
    }
}