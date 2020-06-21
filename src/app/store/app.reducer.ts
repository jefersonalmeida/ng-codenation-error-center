import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../shared/interfaces/user.interface';
import * as userActions from './app.actions';

export interface AppState {
  currentUser: User | null;
}

const initialState: AppState = {
  currentUser: null,
};

const actionReducer = createReducer(
  initialState,
  on(userActions.Login, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.LoginSocial, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.LoginSocialToken, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.LoginSocialFailure, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.LoginRedirect, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.Register, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.Activate, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.ForgotPasswordRecover, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.ForgotPasswordReset, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.ForgotPasswordEmail, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.SetInitialUser, (state): AppState => ({ ...state, currentUser: null })),
  on(userActions.SetCurrentUser, (state, user): AppState => ({
    ...state,
    currentUser: user.payload,
  })),
);

export function appReducer(state: AppState | undefined, action: Action) {
  return actionReducer(state, action);
}
