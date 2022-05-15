import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrls: ['./generic-select.component.css']
})
export class GenericSelectComponent implements OnInit {

  @Input()
  options: any;

  data: any[] = [];

  @Input()
  keyToUpdate = '';

  @Input()
  objectToUpdate: any;

  @Output()
  emitter = new EventEmitter<any>();

  selectedValue: string = ''
  control = new FormControl();
  filteredOptions: Observable<string[]>;


  constructor() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  ngOnInit(): void {
    this.options.subscribe((obj: any) => {
      this.data = obj.data.map((v:any) => v.name);
    })
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data.filter((option: any) => option.toLowerCase().includes(filterValue));
  }

  onSelect(value: any) {
    this.selectedValue = value;
  }

  onBlur() {
    this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.selectedValue });
  }

}
