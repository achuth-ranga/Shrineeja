import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { UserType } from './enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  authenticate(request: any): Observable<any> {
    let supervisor = {
      role: UserType.SUPERVISOR,
      token: UserType.SUPERVISOR
    }
    let driver = {
      role: UserType.DRIVER,
      token: UserType.DRIVER
    }
    let admin = {
      role: UserType.ADMIN,
      token: UserType.ADMIN
    }

    let error = {
      "msg": "Invalid Username or Password"
    }
    if (request.username == UserType.SUPERVISOR) {
      return of(supervisor);
    } else if (request.username == UserType.DRIVER) {
      return of(driver);
    } else if (request.username == UserType.ADMIN) {
      return of(admin);
    } else {
      throw throwError(() => error);
    }
  }

  authSuccess(authResponse: any) {
    localStorage.setItem('role', authResponse.role);
    localStorage.setItem('token', authResponse.token);
    this.redirectBasedOnRole();
  }

  redirectBasedOnRole(){
    let url: any;
    if (this.getUserRole() == UserType.SUPERVISOR) {
      url = ['/trips/add'];
    } else if (this.getUserRole() == UserType.ADMIN) {
      url = ['/trips'];
    } else if (this.getUserRole() == UserType.DRIVER) {
      url = ['/diesel/add'];
    }
    this.router.navigate(url).then(() => {
      window.location.reload();
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });;
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  public getAuthToken(): string {
    let token = "someToken";
    return token;
  }

  public getUserRole(): string {
    return localStorage.getItem("role") as string;
  }
}
