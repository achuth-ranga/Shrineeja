import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {


  fromDate: any;
  toDate: any;
  @Input()
  keyToUpdate = '';

  @Input()
  objectToUpdate: any;

  @Output()
  emitter = new EventEmitter<any>();

  constructor(private datePipe:DatePipe) { 
    this.fromDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');  
    this.toDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); 
  }

  ngOnInit(): void {
  }

  onBlur() {
    // this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.date });
  }
}
