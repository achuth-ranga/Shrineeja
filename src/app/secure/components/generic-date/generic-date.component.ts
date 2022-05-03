import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-generic-date',
  templateUrl: './generic-date.component.html',
  styleUrls: ['./generic-date.component.css']
})
export class GenericDateComponent implements OnInit {

  date: any;

  control = new FormControl();

  @Input()
  keyToUpdate = '';

  @Input()
  objectToUpdate: any;

  @Output()
  emitter = new EventEmitter<any>();

  constructor(private datePipe: DatePipe) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); //whatever format you need. 

  }

  ngOnInit(): void {
    this.onBlur(); // set the default value
  }

  onBlur() {
    this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.date });
  }

}
