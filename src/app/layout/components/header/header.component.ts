import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services';
import { Router } from '@angular/router';
import { ROUTE_LOGIN } from '../../../routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private _isAuthenticated = false;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this._subscribeToUser();
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  onClickLogin(): void {
    this._router.navigateByUrl(ROUTE_LOGIN);
  }

  private _subscribeToUser(): void {
    this._userService.isAuthenticated().subscribe((isAuthenticated) => {
      this._isAuthenticated = isAuthenticated;
    });
  }
}
