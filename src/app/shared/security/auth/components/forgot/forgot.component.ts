import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store';
import * as userActions from '../../../../../store/app.actions';
import { PasswordValidator } from '../../../../validators/password.validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forgot.component.html',
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  public passwordHide = true;
  public token: string = null;
  public email: string = null;
  public btnTextForgot = 'Recuperar';

  constructor(public fb: FormBuilder,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) {

    this.token = this.activatedRoute.snapshot.params.token;
    this.email = this.activatedRoute.snapshot.params.email;

    if (this.token) {
      this.store.dispatch(userActions.ForgotPasswordRecover({
        payload: {
          token: this.token,
          email: this.email,
        },
      }));

      this.btnTextForgot = 'Resetar';
      this.form = this.fb.group(
        {
          email: this.fb.control(this.email ? atob(this.email) : null, [Validators.required, Validators.email]),
          password: this.fb.control(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60),
          ]),
          password_confirmation: this.fb.control(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60),
          ]),
          token: this.fb.control(this.token),
        },
        {
          validators: [PasswordValidator.matchPassword('password', 'password_confirmation')],
        },
      );
    } else {
      this.form = this.fb.group({
        email: this.fb.control(null, [Validators.required, Validators.email]),
      });
    }
  }

  ngOnInit(): void {

  }

  public register(): void {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(
      this.token
        ? userActions.ForgotPasswordReset({payload: this.form.value})
        : userActions.ForgotPasswordEmail({payload: this.form.value}));
  }

  public login() {
    this.router.navigate(['/auth/login']);
  }
}
