import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store';
import * as userActions from '../../../../../store/app.actions';
import { RolesEnum } from '../../../../enums/roles.enum';
import { PasswordValidator } from '../../../../validators/password.validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public passwordHide = true;
  public token: string = null;

  constructor(public fb: FormBuilder,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) {

    this.token = this.activatedRoute.snapshot.params.token;
    if (this.token) {
      this.store.dispatch(userActions.Activate({ payload: this.token }));
    }
    this.form = this.fb.group({
        name: this.fb.control(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: this.fb.control(null, [
          Validators.required,
          Validators.email,
        ]),
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
        roles: this.fb.control([RolesEnum.ROLE_COMPANY], [Validators.required]),
      },
      {
        validators: [PasswordValidator.matchPassword('password', 'password_confirmation')],
      },
    );
  }

  ngOnInit(): void {

  }

  public register(): void {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(userActions.Register({ payload: this.form.value }));
  }

  public login() {
    this.router.navigate(['/auth/login']);
  }

}
