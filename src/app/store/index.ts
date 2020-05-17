import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppEffects } from './app.effects';
import * as fromAuth from './app.reducer';

export const effects = [AppEffects];

export interface AppState {
  app: fromAuth.AppState;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('Root reducers token', {
  factory: () => ({
    app: fromAuth.appReducer,
    router: fromRouter.routerReducer,
  }),
});

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('\x1b[34m%s\x1b[1m', 'prev state', state);
    console.log('\x1b[31m%s\x1b[1m', 'action', action);
    console.log('\x1b[32m%s\x1b[1m', 'next state', result);
    console.groupEnd();

    return result;
  };
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

export * from './app.actions';
export * from './app.effects';
export * from './app.reducer';
export * from './app.selector';
