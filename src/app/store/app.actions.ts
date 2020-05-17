import { createAction, props } from '@ngrx/store';
import { User } from '../shared/interfaces/user.interface';
import {
  ForgotPasswordEmailDTO,
  ForgotPasswordRecoverDTO,
  ForgotPasswordResetDTO,
  LoginDTO,
  RegisterDTO,
} from '../shared/security/auth/auth.interface';

export const Login = createAction('[@auth] Login', props<{ payload: LoginDTO }>());

export const Register = createAction('[@auth] Register', props<{ payload: RegisterDTO }>());
export const Activate = createAction('[@auth] Activate', props<{ payload: string }>());

export const LoginRedirect = createAction('[@auth] LoginRedirect');

export const ForgotPasswordEmail = createAction('[@auth] ForgotPasswordEmail', props<{ payload: ForgotPasswordEmailDTO }>());
export const ForgotPasswordRecover = createAction('[@auth] ForgotPasswordRecover', props<{ payload: ForgotPasswordRecoverDTO }>());
export const ForgotPasswordReset = createAction('[@auth] ForgotPasswordReset', props<{ payload: ForgotPasswordResetDTO }>());

export const SetInitialUser = createAction('[@auth] SetInitialUser');
export const SetCurrentUser = createAction('[@auth] SetCurrentUser', props<{ payload: User }>());

export const Logout = createAction('[@auth] Logout');
export const LogoutConfirmation = createAction('[@auth] LogoutConfirmation');
export const LogoutConfirmationDismiss = createAction('[@auth] LogoutConfirmationDismiss');
