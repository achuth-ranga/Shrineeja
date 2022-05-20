import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { UserType } from './enums/user-type';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticate_url: string = environment.server_uri + "/authenticate";
  private TOKEN_KEY: string = "token";

  constructor(private router: Router, private http: HttpClient) {
  }

  authenticate(request: any): Observable<any> {
    return this.http.post<any>(this.authenticate_url, request, {});

    // let supervisor = {
    //   role: UserType.SUPERVISOR,
    //   token: UserType.SUPERVISOR
    // }
    // let driver = {
    //   role: UserType.DRIVER,
    //   token: UserType.DRIVER
    // }
    // let admin = {
    //   role: UserType.ADMIN,
    //   token: UserType.ADMIN
    // }

    // let error = {
    //   "msg": "Invalid Username or Password"
    // }
    // if (request.username == UserType.SUPERVISOR) {
    //   return of(supervisor);
    // } else if (request.username == UserType.DRIVER) {
    //   return of(driver);
    // } else if (request.username == UserType.ADMIN) {
    //   return of(admin);
    // } else {
    //   throw throwError(() => error);
    // }
  }

  authSuccess(authResponse: any) {
    localStorage.setItem(this.TOKEN_KEY, authResponse.jwtToken);
    this.redirectBasedOnRole();
  }

  redirectBasedOnRole() {
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
    });
  }

  public isAuthenticated(): boolean {
    let authenticated: boolean = true;
    let token = localStorage.getItem(this.TOKEN_KEY) as string;
    if (token != null) {
      let decoded: JwtPayload = jwt_decode<JwtPayload>(token);
      if (decoded.exp) {
        authenticated = (decoded?.exp) < (new Date().getTime())
      } else {
        authenticated = false;
      }
    } else {
      authenticated = false;
    }
    return authenticated;
  }

  public getAuthToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) as string;
  }

  public getUserRole(): string {
    let token = localStorage.getItem(this.TOKEN_KEY) as string;
    let decoded: any = jwt_decode(token);
    return decoded["roles"][0];
  }
}
