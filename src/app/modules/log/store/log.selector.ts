import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LogState } from '.';

export const selectFeatureState: MemoizedSelector<object, LogState> = createFeatureSelector<LogState>('logs');
export const selectEntities = createSelector(selectFeatureState, state => state.entities);
export const selectEntity = createSelector(selectFeatureState, state => state.entity);
export const selectQuery = createSelector(selectFeatureState, state => state.query);
export const loading = createSelector(selectFeatureState, state => state.loading);
