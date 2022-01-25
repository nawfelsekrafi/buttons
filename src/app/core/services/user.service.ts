import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD } from '../../routes';

/**
 * MOCK SERVICE
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private _httpClient: HttpClient,
    private _router: Router
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  login(user: string, password: string) {
    this._httpClient
      .post(`${this.baseUrl}/api/login`, {
        user,
        password,
      })
      .subscribe((response) => {
        if (response) {
          this._isAuthenticated.next(true);
          this._router.navigateByUrl(ROUTE_DASHBOARD);
        }
      });
  }
}
