import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AuthRoutingModule } from './auth.routing.module';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SocialComponent } from './components/social/social.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [LoginComponent, ForgotComponent, RegisterComponent, SocialComponent],
})
export class AuthModule {
}
