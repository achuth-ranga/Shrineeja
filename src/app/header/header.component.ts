import { Component, OnInit, Input } from '@angular/core';
import {} from '@angular/material'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() showBackButton: boolean;
  @Input() currentTitle: string;
  @Input() showHistoryNav: boolean;

  constructor() {
    this.showBackButton = false;
    this.currentTitle = "Shreenija Travels"
    this.showHistoryNav = true;
   }

  ngOnInit(): void {
  }

}
