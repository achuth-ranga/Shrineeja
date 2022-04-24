import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  historyCount:String
  constructor() { 
    this.historyCount = "0"
  }

  ngOnInit(): void {
  }

}
