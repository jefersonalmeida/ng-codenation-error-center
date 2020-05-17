import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PermissionState } from '.';

export const selectFeatureState: MemoizedSelector<object, PermissionState> = createFeatureSelector<PermissionState>('permissions');
export const selectEntities = createSelector(selectFeatureState, state => state.entities);
export const selectEntity = createSelector(selectFeatureState, state => state.entity);
export const loading = createSelector(selectFeatureState, state => state.loading);
