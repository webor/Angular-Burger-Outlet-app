import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash';
import { OrderDetailService } from '../services/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  selectedBurgerMap;
  selectedProductList;
  private total: number;
  private totalCount: number;

  constructor( private orderDetailService: OrderDetailService ) { 
    this.selectedProductList;
    this.total = 0;
    this.totalCount = 0;
  }

  ngOnInit() {
    this.orderDetailService.currentMessage.subscribe( data => this.selectedBurgerMap = data );
    this.selectedProductList = this.convertMapToList();
  }

  convertMapToList() {
    const _productList = [];
    for( let item in this.selectedBurgerMap ) {
      if( ! isEmpty( this.selectedBurgerMap[ item ] ) ) {
        _productList.push( this.selectedBurgerMap[ item ] );
        this.total = this.total + this.selectedBurgerMap[ item ].total;
        this.totalCount = this.totalCount + this.selectedBurgerMap[ item ].count;
      }
    }
    return _productList;
  }

}
