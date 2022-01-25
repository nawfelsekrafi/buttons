import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({});

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      user: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(): void {
    const { user, password } = this.loginFormGroup.value;
    this._userService.login(user, password);
  }
}
