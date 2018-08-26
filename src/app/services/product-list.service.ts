// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';

// @Injectable()
// export class ProductService{
//     private url = "http://demo3973784.mockable.io/menu.json";

//     constructor( private http: Http ) {
//         window.console.log( 'ProductService.constructor' );
//     }

//     getData() {
//         window.console.log( 'ProductService.getData' );
//         return this.http.get( this.url );
//     }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService{

  private dataSource = new BehaviorSubject<{}>({}); // this will hold the current value of the message
  currentData = this.dataSource.asObservable();

  constructor() {}

  postData( data ) {
    this.dataSource.next( data );
  }
}
