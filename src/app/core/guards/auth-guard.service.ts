import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UserService } from '../services';
import { ROUTE_LOGIN } from '../../routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this._userService.isAuthenticated().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this._router.navigateByUrl(ROUTE_LOGIN);
          return false;
        }
        return true;
      })
    );
  }
}
