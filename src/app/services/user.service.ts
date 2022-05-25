import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableColumn } from './models/table-column';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrl: string = environment.server_uri;
  private createUserUrl: string = this.serviceUrl + "/users";
  private usersQueryUrl: string = this.serviceUrl + "/users/query";
  private getProfileUrl: string = this.serviceUrl + "/users";
  private profileUpdateUrl: string = this.serviceUrl + "/users/profile";
  private changePasswordUrl: string = this.serviceUrl + "/users/changepassword";



  constructor(private http: HttpClient) { }


  getUserViewColumns(): Observable<TableColumn[]> {
    let columns: TableColumn[] = [
      {
        "key": "firstName",
        "type": "text",
        "label": "FirstName",
        "required": true
      },
      {
        "key": "lastName",
        "type": "text",
        "label": "LastName",
        "required": true
      },
      {
        "key": "email",
        "type": "email",
        "label": "Email",
        "required": true
      },
      {
        "key": "mobile",
        "type": "number",
        "label": "Mobile",
        "required": true
      },
      {
        "key": "address",
        "type": "textarea",
        "label": "Address",
        "required": true
      }
    ]
    let data: any = { 'columns': columns }
    return of(data);
  }

  fetchUsers(filter: any): Observable<any[]> {
    return this.http.post<any[]>(this.usersQueryUrl, filter, {});
  }

  createUser(user: any): Observable<any[]> {
    return this.http.put<any[]>(this.createUserUrl, user, {});
  }

  getProfile(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.createUserUrl+"/"+userId, {});
  }

  updateProfile(user: any): Observable<any[]> {
    return this.http.post<any[]>(this.profileUpdateUrl, user, {});
  }

  changePassword(user: any): Observable<any[]> {
    return this.http.post<any[]>(this.changePasswordUrl, user, {});
  }
}
