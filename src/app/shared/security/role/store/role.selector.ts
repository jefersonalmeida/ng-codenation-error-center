import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { RoleState } from '.';

const selectFeatureState: MemoizedSelector<object, RoleState> = createFeatureSelector<RoleState>('roles');
export const selectEntities = createSelector(selectFeatureState, state => state.entities);
export const selectEntity = createSelector(selectFeatureState, state => state.entity);
export const loading = createSelector(selectFeatureState, state => state.loading);
