import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent implements OnChanges {
  categoryFilter;
  selectedValue;
  @Input() private filterData;
  @Output() public broadcastFilter = new EventEmitter();

  constructor() {
    this.selectedValue = '';
   }

  ngOnChanges() {
    this.categoryFilter = this.filterData ? this.filterData.filterList.find( ( filter ) => { return filter.id === 'category'; } ).options: [];
  }

  onClick( payload ) {
    window.console.log( 'FilterRatingComponent.onChange' );
    this.categoryFilter.forEach( ( filter ) => {
      if( filter.id === payload.id ) {
        this.selectedValue = payload.id;
        this.broadcastFilter.emit( {
          data: filter,
          type: "radio"
        } );
      } 
    } ) 
  }

}
