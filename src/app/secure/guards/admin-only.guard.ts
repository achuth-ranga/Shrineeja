import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/services/enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class AdminOnlyGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = this.authService.getUserRole();
      return UserType.ADMIN == role;
  }
  
}
