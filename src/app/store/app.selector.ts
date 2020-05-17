import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const selectFeatureState: MemoizedSelector<object, AppState> = createFeatureSelector<AppState>('app');
export const getCurrentUser = createSelector(selectFeatureState, state => state.currentUser);
