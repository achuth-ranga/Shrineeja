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

  selectedValue: any = {'id': '', 'name' : ''}

  control = new FormControl();
  filteredOptions: Observable<any[]>;


  constructor() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  ngOnInit(): void {
    this.options.subscribe((obj: any) => {
      this.data = obj.data;
    })
  }

  private filter(value: any): any[] {
    try{
      const filterValue = value.toLowerCase();
      return this.data.filter((option: any) => option.name.toLowerCase().includes(filterValue));
    }catch(Error ){
      return this.data;
    }
  }

  onSelect(value: any) {
    this.selectedValue = value;
  }

  onBlur(event:any) {
    if(this.selectedValue.name != event.target.value){
      // Unknown value
      this.selectedValue.name = event.target.value;
      this.selectedValue.id = event.target.value;
    }
    this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.selectedValue });
  }

}
