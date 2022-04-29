import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title:string;
  public isLoggedIn:boolean;
  public role:string;

  constructor(private authService: AuthService) { 
    this.title = "Shreenija Travels";
    this.isLoggedIn = false;
    this.role="";
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.role = this.authService.getUserRole();
  }

 

}
