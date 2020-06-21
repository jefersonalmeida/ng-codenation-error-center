import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromApp from '../../../../../store';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordHide = true;
  public returnUrl: string;
  public email: string = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public fb: FormBuilder,
              private oAuthService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) {

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/dashboard';
    this.email = this.activatedRoute.snapshot.params.email;
    this.form = this.fb.group({
      email: this.fb.control(this.email ? atob(this.email) : null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.store.pipe(
      select(fromApp.getCurrentUser),
      map((user: User) => user && this.router.navigate(['/dashboard'])),
      takeUntil(this.ngUnsubscribe),
    ).subscribe();
  }

  public login(): void {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch(fromApp.Login({ payload: this.form.value }));
  }

  public forgot() {
    this.router.navigate(['/auth/forgot']);
  }

  public register() {
    this.router.navigate(['/auth/register']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public loginSocialGoogle() {
    this.loginSocial('google');
  }

  public loginSocialFacebook() {
    this.loginSocial('facebook');
  }

  private loginSocial(provider: string) {
    this.store.dispatch(fromApp.LoginSocial({ payload: provider }));
  }
}
