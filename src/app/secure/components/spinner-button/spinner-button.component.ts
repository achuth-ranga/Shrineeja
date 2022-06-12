import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css']
})
export class SpinnerButtonComponent implements OnInit {

  @Input()
  trigger: any;

  @Input()
  label: string = "Submit";

  @Input()
  disabled: boolean = false;

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
