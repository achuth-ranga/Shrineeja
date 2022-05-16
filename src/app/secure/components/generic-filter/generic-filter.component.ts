import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.css']
})
export class GenericFilterComponent implements OnInit {

  @Input()
  keyToUpdate = '';

  @Input()
  objectToUpdate: any;

  @Input()
  filterMethod: any;

  @Output()
  emitter = new EventEmitter<any>();

  selectedOption: any = {'id': '', 'name' : ''}
  display:string = this.selectedOption.name;
  control = new FormControl();
  filteredOptions: Observable<any[]> = EMPTY;

  constructor(private http: HttpClient) {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((val: string) => {
        let filtered: Observable<any[]> = this.filterMethod(val || '')
        return filtered
      })
    )
  }

  ngOnInit(): void {
    //
  }

  onSelect(value: any) {
    this.display = value.name;
    this.selectedOption = value;
  }

  onChange() {
    if(this.selectedOption.name != this.display){
      // Unknown value
      this.selectedOption.name = this.display;
      this.selectedOption.id = this.display;
    }
    this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.selectedOption });
  }

}
