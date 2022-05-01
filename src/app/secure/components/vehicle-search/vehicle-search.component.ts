import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MisMatserDataService } from 'src/app/services/mis-matser-data.service';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements OnInit {

  @Input()
  keyToUpdate = '';

  @Input()
  objectToUpdate: any;

  @Output()
  emitter = new EventEmitter<any>();

  regno: string = ''

  regNoControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(private dataService: MisMatserDataService) {
    this.filteredOptions = this.regNoControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this.dataService.filterVehicles(val || '')
      }),
    )
  }
  ngOnInit(): void {
  }

  onSelect(regno: any) {
    this.regno = regno;
  }

  onRegNoChange() {
    this.emitter.emit({ 'key': this.keyToUpdate, 'object': this.objectToUpdate, 'value': this.regno });
  }

}
