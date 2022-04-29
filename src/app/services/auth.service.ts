import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    let authenticated: boolean = true;
    return authenticated;
  }

  public getAuthToken(): string {
    let token = "someToken";
    return token;
  }

  public getUserRole(): string{
    let admin = "admin";
    let supervisor = "supervisor";
    return supervisor;
  }
}
