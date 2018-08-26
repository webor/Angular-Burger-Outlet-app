import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnChanges {
  filterData;
  @Input() public metaData;
  @Output() public broadcastRadioFilter = new EventEmitter();
  @Output() public broadcastCheckboxFilter = new EventEmitter();

  constructor() {
    this.metaData;
   }

  ngOnChanges() {
    this.filterData = this.metaData ? this.metaData.filters: undefined;
  }

  setRatingFilter( payload ) {
    this.broadcastRadioFilter.emit( payload );
  }

  setCategoryFilter( payload ) {
    this.broadcastCheckboxFilter.emit( payload );
  }

}
