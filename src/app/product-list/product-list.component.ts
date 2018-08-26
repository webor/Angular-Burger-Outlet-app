import { Component, OnInit, Input } from '@angular/core';
import { isEmpty } from 'lodash';
import { ProductService } from '../services/product-list.service';
import { OrderDetailService } from '../services/order-detail.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductComponent implements OnInit {
  menuList: any[];
  metaData;
  filteringOrder;
  selectedFiltersMap;
  selectedBurgersList;
  filteredProductList;
  selectedBurgerMap;
  
  /**
     * new ProductService(); by creating instance of service class
     * tightly coupling it so we pass as parameter which decouples
     * This is Dependency Injection w.e including dependency in the constructor
     */
  constructor( 
    private storeService: StoreService,
    private productService: ProductService, 
    private orderDetailService: OrderDetailService ) {
    this.selectedFiltersMap = {};
   }

   ngOnInit() {
    window.console.log( 'ProductComponent.ngOnInit' );
    this.productService.currentData.subscribe( ( data ) => {
      if( ! isEmpty( data ) ) {
        this.appendData( data );
      }
    } );
    this.storeService.currentMessage.subscribe( ( data ) => { 
      if( ! isEmpty( data ) ) {
        this.updateSelfProps( data );
      }
    } );
  }

  updateSelfProps( data ) {
    this.selectedBurgerMap = data.map;
    this.selectedBurgersList = data.list; 
  }

  appendData( payload ) {
    window.console.log( 'ProductComponent.filterProductListByRating' );
    this.menuList = payload.menuList;
    this.filteredProductList = payload.menuList;
    this.metaData = payload.metaData;
    this.filteringOrder= payload.filteringOrder;
  }

  registerFilter( payload ) {
    window.console.log( 'ProductComponent.filterProductListByRating' );
    this.selectedFiltersMap[ payload.type ] = payload.data;
    this.activateFilters();
  }

  activateFilters() {
    window.console.log( 'ProductComponent.filterProductListByRating' );
    for( let i = 0; i < this.filteringOrder.length; i = i + 1 ) {
      
      if( 'checkbox' === this.filteringOrder[ i ] ) {
        this.filteredProductList = this.filterProductListByRating( {
          list: this.menuList,
          filters: this.selectedFiltersMap[ this.filteringOrder[ i ] ] ? this.selectedFiltersMap[ this.filteringOrder[ i ] ]: [] 
         } );
         continue;
      } else if( 'radio' === this.filteringOrder[ i ] ) {
        this.filteredProductList = this.filterProductListByCategory( { 
          list: this.filteredProductList, 
          filters: this.selectedFiltersMap[ this.filteringOrder[ i ] ] ? this.selectedFiltersMap[ this.filteringOrder[ i ] ]: [] 
        } );
        continue;
      } else if( 'search' === this.filteringOrder[ i ] ) {
        this.filteredProductList = this.searchProductList( {
          list: this.filteredProductList,
          filters: this.selectedFiltersMap[ this.filteringOrder[ i ] ]
        } ) ;
        continue;
      }
    }
  }

  filterProductListByRating( payload ) {
    window.console.log( 'ProductComponent.filterProductListByRating' );
    const { list, filters } = payload;
    let _selectedProducts = [];
    if( filters.length !== 0 ) {
      list.forEach( ( option ) => {
        filters.forEach( ( item ) => { 
          if( option.rating === item.value ) {
            _selectedProducts.push( option );
          }
         } );
      } );
    } else {
      _selectedProducts = this.menuList;
    }
    return _selectedProducts;
  }

  filterProductListByCategory( payload ) {
    window.console.log( 'ProductComponent.filterProductListByCategory' );
    const { list, filters } = payload;
    if( filters.length !== 0 ) {
      return  list.filter( ( option ) => {
        return option.category === filters.id;
      } );
    } else {
      return this.filteredProductList;
    }
  }

  

  searchProductList( payload ) {
    window.console.log( 'ProductComponent.receiveSelectedProduct' );
    const { list, filters } = payload;
    return list.filter( ( option ) => {
      return ( -1 !==  option.displayLabel.toLowerCase().search( filters ) ) ||
						option.displayLabel.toLowerCase().startsWith( filters );
				} );
  }

  receiveSelectedProduct( payload ) {
    window.console.log( 'ProductComponent.receiveSelectedProduct' );
    const _selectedProduct = this.menuList.find( ( product ) => { return payload === product.id } );
    if( this.selectedBurgersList ) {
      this.selectedBurgersList.push( _selectedProduct );
    } else {
      this.selectedBurgersList = [];
      this.selectedBurgerMap = {};
      this.selectedBurgersList.push( _selectedProduct );
    }
    this.changeselectedBurgerCount( _selectedProduct );
  }

  receiveRemovedProduct( payload ) {
    window.console.log( 'ProductComponent.receiveSelectedProduct' );
    const _selectedProductIndex = this.selectedBurgersList.findIndex( ( product ) => { return payload === product.id } );
    const _selectedProduct = this.menuList.find( ( product ) => { return payload === product.id } );
    this.selectedBurgersList.splice( _selectedProductIndex, 1 );
    this.changeremovedBurgerCount( _selectedProduct );
  }

  changeremovedBurgerCount( payload ) {
    window.console.log( 'ProductComponent.changeselectedBurgerCount' );
    let _items = {};
    if( 1 === this.selectedBurgerMap[ payload.id ].count ) {
      this.selectedBurgerMap[ payload.id ] = null;

    } else {
      for( let i = 0; i < this.selectedBurgersList.length; i = i + 1 ) {
        if( this.selectedBurgerMap[ payload.id ] ) {
          this.selectedBurgerMap[ payload.id ].count = this.selectedBurgerMap[ payload.id ].count - 1;
          this.selectedBurgerMap[ payload.id ].total = this.selectedBurgerMap[ payload.id ].total - payload.price;
          break;
        }
      }
    }
    this.updateOrderDetails();
  }

  changeselectedBurgerCount( payload ) {
    window.console.log( 'ProductComponent.changeselectedBurgerCount' );
    let _items = {};
    for( let i = 0; i < this.selectedBurgersList.length; i = i + 1 ) {
      if( this.selectedBurgerMap[ payload.id ] ) {
        this.selectedBurgerMap[ payload.id ].count = this.selectedBurgerMap[ payload.id ].count + 1;
        this.selectedBurgerMap[ payload.id ].total = this.selectedBurgerMap[ payload.id ].total + payload.price;
        break;
      } else {
        this.selectedBurgerMap[ payload.id ] = {};
        this.selectedBurgerMap[ payload.id ].count = 1;
        this.selectedBurgerMap[ payload.id ].id = payload.id;
        this.selectedBurgerMap[ payload.id ].imageUrl = payload.imageUrl;
        this.selectedBurgerMap[ payload.id ].displayLabel = payload.displayLabel;
        this.selectedBurgerMap[ payload.id ].total = payload.price;
        this.selectedBurgerMap[ payload.id ].category = payload.category;
        break;
      }
    }
    this.updateOrderDetails();
  }

  updateOrderDetails() {
    window.console.log( 'ProductComponent.updateOrderDetails' );
    this.orderDetailService.changeMessage( this.selectedBurgerMap );
    this.storeService.changeMessage( { map: this.selectedBurgerMap, list: this.selectedBurgersList } );
  }

}
