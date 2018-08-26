import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filter-rating',
  templateUrl: './filter-rating.component.html',
  styleUrls: ['./filter-rating.component.css']
})
export class FilterRatingComponent implements OnChanges {
  ratingsFilter;
  selectedFilters;
  @Input() private filterData;
  @Output() public broadcastFilter = new EventEmitter();

  constructor() {
    this.filterData
    this.selectedFilters = [];
   }

  ngOnChanges() {
    this.ratingsFilter = this.filterData ? this.filterData.filterList.find( ( filter ) => { return filter.id === 'ratings'; } ).options: [];
    this.createStars();
  }

  createStars() {
    if( 0 < this.ratingsFilter.length ) {
      this.ratingsFilter.map( ( filter, index ) => {
        filter.stars = [];
        for( let i = 0; i < filter.value; i = i + 1 ) {
          filter.stars.push( i );
        }
      } );
    }
  }

  onChange( payload ) {
    window.console.log( 'FilterRatingComponent.onChange' );
    this.ratingsFilter.forEach( ( filter, index ) => {
      if( filter.id === payload.id && payload.event.checked ) {
        this.selectedFilters.push( filter )
      } else if( filter.id === payload.id && ! payload.event.checked ) {
        const _selectedIndex = this.selectedFilters.findIndex( ( item ) => { return item.id === payload.id; } );
        this.selectedFilters.splice( _selectedIndex, 1 );
      }
    } ) 
    this.broadcastFilter.emit( {
      data: this.selectedFilters,
      type: "checkbox"
    } );
  }

}
