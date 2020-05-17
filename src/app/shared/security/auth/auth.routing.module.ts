import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'login/:email', component: LoginComponent, data: {title: 'Login'}},
  {path: 'forgot', component: ForgotComponent, data: {title: 'Recuperar senha'}},
  {path: 'forgot/:token', component: ForgotComponent, data: {title: 'Recuperar senha'}},
  {path: 'forgot/:token/:email', component: ForgotComponent, data: {title: 'Recuperar senha'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Cadastrar'}},
  {path: 'activate/:token', component: RegisterComponent, data: {title: 'Ativar conta'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
