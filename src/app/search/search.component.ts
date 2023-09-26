import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{


  searchValue: string = '';
 
  constructor () {}
  ngOnInit(): void {
    
  }


  
  @Output()searchValueChange: EventEmitter<string> = new EventEmitter<string>();

  // searchValue
  
  

  // onSearchChange 
  onSearchChange() {
    this.searchValueChange.emit(this.searchValue);
  }
}
