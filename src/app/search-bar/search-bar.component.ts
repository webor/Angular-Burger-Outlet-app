import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() public metaData;
  @Output() public broadcastSearchQuery = new EventEmitter();

  constructor() { 
    this.metaData;
  }

  ngOnInit() {
  }

  filterProducts( query ){
    window.console.log( 'SearchBarComponent.filterProducts' );
    this.broadcastSearchQuery.emit( {
      data: query,
      type: "search"
    } );  
  }

}
