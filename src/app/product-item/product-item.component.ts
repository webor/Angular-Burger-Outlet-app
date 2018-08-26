import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() public metaData;
  public isVeg: boolean;
  @Input() id: string;
  @Input() imageUrl: string;
  @Input() category: string;
  @Input() displayLabel: string;
  @Input() price: number;
  @Input() selectedBurgerMap;
  @Input() selectedBurgersList;
  private selfCount: number;
  @Output() public broadcastSelectedProduct = new EventEmitter();
  @Output() public broadcaseDeselectedProduct = new EventEmitter();

  constructor( component: ProductComponent ) {
    window.console.log( 'ProductItemComponent.constructor()' );
    this.id;
    this.isVeg;
    this.imageUrl;
    this.category;
    this.selectedBurgerMap;
  }

  ngOnInit() {
    this.isVeg = ( this.category === 'veg' );
    if( this.selectedBurgerMap ) {
      if( this.selectedBurgerMap[ this.id ] ) {
        this.selfCount = this.selectedBurgerMap[ this.id ].count;
      } else {
        this.selfCount = 0;
      }
    } else {
      this.selfCount = 0;
    }
  }

  onSelect( item ) {
    window.console.log( 'ProductItemComponent.onSelect' );
    this.selfCount = this.selfCount + 1;
    this.broadcastSelectedProduct.emit( this.id );  
  }

  onRemove( item ) {
    if( this.selectedBurgerMap[ this.id ] ) {
      this.selfCount = this.selfCount - 1;
      this.broadcaseDeselectedProduct.emit( this.id );  
    } else if( 0 !== this.selfCount ) {
      this.selfCount = this.selfCount - 1;
      this.broadcaseDeselectedProduct.emit( this.id );  
    }
  }

}
