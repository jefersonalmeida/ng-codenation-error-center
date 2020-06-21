import { Action, createReducer, on } from '@ngrx/store';
import * as fromFeature from '.';
import * as featureActions from './permission.actions';

const initialState: fromFeature.PermissionState = {
  entities: [],
  entity: null,
  loading: false,
  query: {
    search: '',
    order: 'name',
    sort: 'asc',
    number: 1,
    size: 20,
  },
};

const actionReducer = createReducer(
  initialState,

  on(featureActions.LoadEntities, (state, action): fromFeature.PermissionState => ({
    ...state,
    entity: null,
    loading: true,
    query: action.query,
  })),

  on(featureActions.LoadEntitiesFilter, (state, action): fromFeature.PermissionState => ({
    ...state,
    entity: null,
    entities: [],
    loading: true,
    query: action.query,
  })),

  on(featureActions.LoadEntitiesSuccess, (state, action): fromFeature.PermissionState => ({
    ...state,
    entity: null,
    loading: false,
    query: action.query,
    entities: action.entities.length ? state.entities.concat(action.entities) : state.entities,
  })),

  on(featureActions.LoadEntity, (state): fromFeature.PermissionState => ({
    ...state,
    entity: null,
    loading: true,
  })),

  on(featureActions.LoadEntitySuccess, (state, action): fromFeature.PermissionState => ({
    ...state,
    entity: action.entity,
    loading: false,
  })),

  on(featureActions.CreateEntity, (state): fromFeature.PermissionState => ({
    ...state,
    entity: null,
    loading: true,
  })),

  on(featureActions.CreateEntitySuccess, (state, action): fromFeature.PermissionState => ({
    ...state,
    entities: [...state.entities, action.entity],
    entity: action.entity,
    loading: false,
  })),

  on(featureActions.UpdateEntity, (state, action): fromFeature.PermissionState => ({
    ...state,
    entity: action.entity,
    loading: true,
  })),

  on(featureActions.UpdateEntitySuccess, (state, action): fromFeature.PermissionState => ({
    ...state,
    entities: state.entities.map(entity => entity.id === action.entity.id ? {...entity, ...action.entity} : entity),
    entity: action.entity,
    loading: false,
  })),

  on(featureActions.DeleteEntity, (state, action): fromFeature.PermissionState => ({
    ...state,
    entity: action.entity,
    loading: true,
  })),

  on(featureActions.DeleteEntitySuccess, (state, action): fromFeature.PermissionState => ({
    ...state,
    entities: state.entities.filter(entity => entity.id !== action.id),
    entity: null,
    loading: false,
  })),
);

export function permissionReducer(state: fromFeature.PermissionState | undefined, action: Action) {
  return actionReducer(state, action);
}
