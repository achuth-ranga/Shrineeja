import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  selectedOption: string = ''
  control = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((val: string) => {
        let filtered: any[] = this.filterMethod(val || '')
        return filtered
      })
    )
  }

  ngOnInit(): void {
  }

  onSelect(value: any) {
    this.selectedOption = value;
  }

  onChange() {
    this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.selectedOption });
  }

}
