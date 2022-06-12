import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-spinner-excel-icon',
  templateUrl: './spinner-excel-icon.component.html',
  styleUrls: ['./spinner-excel-icon.component.css']
})
export class SpinnerExcelIconComponent implements OnInit {

  @Input()
  trigger: any;

  @Input()
  inProgress: boolean = false;

  @Input()
  spinnerRadius: number = 30;

  @Output()
  emitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked() {
    this.emitter.emit();
  }

}
