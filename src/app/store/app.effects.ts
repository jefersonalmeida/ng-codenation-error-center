import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { ModalConfirmComponent } from '../shared/components/modal-confirm/modal-confirm.component';
import { User } from '../shared/interfaces/user.interface';
import {
  ForgotPasswordEmailDTO,
  ForgotPasswordRecoverDTO,
  ForgotPasswordResetDTO,
  LoginDTO,
  RegisterDTO,
} from '../shared/security/auth/auth.interface';
import { AuthService } from '../shared/security/auth/auth.service';
import * as authActions from './app.actions';
import { AnalyticsService } from '../shared/services/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class AppEffects {

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.Login),
      tap(_ => AnalyticsService.eventEmitter('login', 'engagement', 'Login', 1)),
      map(action => action.payload),
      exhaustMap((action: LoginDTO) => this.authService.login(action)
        .pipe(
          map((user: User) => authActions.SetCurrentUser({ payload: user })),
          tap(() => this.router.navigate(['/dashboard'])),
        ),
      ),
    ),
  );

  loginSocial$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.LoginSocial),
      map(action => this.authService.loginSocial(action.payload)),
    ), { dispatch: false },
  );

  loginSocialFailure$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.LoginSocialFailure),
      map(() => this.authService.goToLogin()),
    ), { dispatch: false },
  );

  loginSocialToken$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.LoginSocialToken),
      map(action => action.payload),
      exhaustMap(action => this.authService.loginSocialToken(action)
        .pipe(
          map((user: User) => authActions.SetCurrentUser({ payload: user })),
          tap(() => this.router.navigate(['/dashboard'])),
          catchError(() => of(authActions.LoginSocialFailure())),
        ),
      ),
    ),
  );

  register$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.Register),
      tap(_ => AnalyticsService.eventEmitter('register', 'engagement', 'Register', 1)),
      map(action => action.payload),
      exhaustMap((action: RegisterDTO) => this.authService.register(action)
        .pipe(
          map(() => this.authService.goToLogin(action.email ? btoa(action.email) : null)),
        ),
      ),
    ), { dispatch: false },
  );

  activate$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.Activate),
      map(action => action.payload),
      mergeMap((token: string) => this.authService.activate(token)
        .pipe(
          map((user: User) => authActions.SetCurrentUser({ payload: user })),
          tap(() => this.router.navigate(['/dashboard'])),
        ),
      ),
    ),
  );

  forgotPasswordEmail$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.ForgotPasswordEmail),
      map(action => action.payload),
      mergeMap((action: ForgotPasswordEmailDTO) => this.authService.forgotEmail(action)
        .pipe(
          map(() => this.authService.goToLogin(action.email ? btoa(action.email) : null)),
        ),
      ),
    ), { dispatch: false },
  );

  forgotPasswordReset$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.ForgotPasswordReset),
      map(action => action.payload),
      mergeMap((action: ForgotPasswordResetDTO) => this.authService.forgotReset(action)
        .pipe(
          map(() => this.authService.goToLogin(action.email ? btoa(action.email) : null)),
        ),
      ),
    ), { dispatch: false },
  );


  forgotPasswordRecover$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.ForgotPasswordRecover),
      map(action => action.payload),
      mergeMap((action: ForgotPasswordRecoverDTO) => this.authService.forgotRecover(action)
        .pipe(
          catchError(() => of(this.authService.goToLogin(action.email))),
        ),
      ),
    ), { dispatch: false },
  );

  loginRedirect$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.LoginRedirect),
      // tap( () => StorageService.clear()),
      map(() => this.authService.goToLogin()),
    ), { dispatch: false },
  );

  setInitialUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.SetInitialUser),
      mergeMap(() => this.authService.whoami()
        .pipe(
          map((user: User) => authActions.SetCurrentUser({ payload: user })),
        ),
      ),
    ),
  );

  logoutConfirmation$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.LogoutConfirmation),
      tap(_ => AnalyticsService.eventEmitter('logout_confirmation', 'engagement', 'Logout', 1)),
      mergeMap(() => {
        // let modalRef: BsModalRef;
        const modalRef = this.modalService.show(ModalConfirmComponent, {
          initialState: {
            listMessages: [
              'Tem certeza que deseja sair',
              'Saiba que você pode voltar a qualquer momento.',
              'Basta efetuar o login novamente.',
            ],
            title: 'Você está indo embora...',
          },
          class: `modal-md modal-dialog-centered modal-info`,
        });
        return modalRef.content.onClose;
      }),
      map(result => result ? authActions.Logout() : authActions.LogoutConfirmationDismiss()),
    ),
  );

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(authActions.Logout),
      tap(_ => AnalyticsService.eventEmitter('logout_confirmed', 'engagement', 'Logout', 1)),
      mergeMap(() => this.authService.destroyToken()
        .pipe(
          map(result => {
            if (result && !result.error) {
              return authActions.LoginRedirect();
            }
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService,
  ) {
  }
}
