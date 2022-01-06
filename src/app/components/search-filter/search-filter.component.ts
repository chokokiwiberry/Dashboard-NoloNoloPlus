import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
@Output() inputsearched = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    
  }

  onKey(event: any) {
    const inputValue = event;
    console.log('prova', inputValue.target.value);
    this.inputsearched.emit(inputValue.target.value);
  }

}
