import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash';
import { ProductService } from '../services/product-list.service';
import { StoreService } from '../services/store.service';
import { FetchProductService } from '../services/fetch-products.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {
  selectedBurgerMap;
  selectedBurgerList;
  menuList;
  metaData;
  filteringOrder;


  constructor( 
    private storeService: StoreService,
    private service: FetchProductService, 
    private postProductService: ProductService 
  ) {
    this.menuList = {};
    this.selectedBurgerMap = {};
    this.selectedBurgerList = [];
    this.metaData = {};
    this.filteringOrder = {};
  }

  ngOnInit() {
    window.console.log( 'ProductComponent.ngOnInit' );
    this.storeService.currentMessage.subscribe( ( data ) => { 
      if( ! isEmpty( data ) ) {
        this.appendData( data ); 
      }
    } );
    this.service.getData()
      .subscribe( ( response ) => {
        const payload = response.json();
        this.menuList = payload.data.menu;
        this.metaData = payload.meta;
        this.filteringOrder = payload.meta.filteringOrder;
        this.updateOrderDetails();
      }, ( error ) => {
        alert( 'An Unexpected error has occurred' );
        window.console.log( error );
      } );     
  }

  appendData( data ) {
    window.console.log( 'ProductComponent.appendData' );
    this.selectedBurgerMap = data.map;
    this.selectedBurgerList = data.list;
  }

  updateOrderDetails() {
    window.console.log( 'ProductComponent.updateOrderDetails' );
    this.postProductService.postData( { 
      menuList: this.menuList,
      metaData: this.metaData,
      filteringOrder: this.filteringOrder
     } );
  }


}
