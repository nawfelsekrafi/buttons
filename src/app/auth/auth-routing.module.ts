import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'giris', component: LoginPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule {}
