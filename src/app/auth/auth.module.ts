import { NgModule } from '@angular/core';
import { LoginPage } from './pages';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPage],
  imports: [SharedModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AuthModule {}
