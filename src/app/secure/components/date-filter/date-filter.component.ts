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
  previousDays: number = 7;

  @Output()
  emitter = new EventEmitter<any>();

  constructor(private datePipe:DatePipe) { 
    let start = new Date();
    start.setDate(start.getDate() - this.previousDays);
    this.fromDate = this.datePipe.transform(start, 'yyyy-MM-dd');  
    this.toDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); 
  }

  ngOnInit(): void {
    this.onStartDateBlur();
    this.onEndDateBlur();
  }

  onStartDateBlur() {
    this.emitter.emit({ 'key': "startDate", 'value': this.fromDate });
  }

  onEndDateBlur(){
    this.emitter.emit({ 'key': "endDate", 'value': this.toDate });
  }
}
