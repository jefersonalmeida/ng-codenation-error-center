import { Action, createReducer, on } from '@ngrx/store';
import * as fromFeature from '.';
import * as featureActions from './role.actions';

const initialState: fromFeature.RoleState = {
  entities: [],
  entity: null,
  loading: false,
  query: {
    search: '',
    orderBy: 'name',
    sortedBy: 'asc',
    current_page: 1,
    per_page: 2,
  },
};

const actionReducer = createReducer(
  initialState,

  on(featureActions.LoadEntities, (state, action): fromFeature.RoleState => ({
    ...state,
    entity: null,
    loading: true,
    query: action.query,
  })),

  on(featureActions.LoadEntitiesFilter, (state, action): fromFeature.RoleState => ({
    ...state,
    entity: null,
    entities: [],
    loading: true,
    query: action.query,
  })),

  on(featureActions.LoadEntitiesSuccess, (state, action): fromFeature.RoleState => ({
    ...state,
    entity: null,
    loading: false,
    query: action.query,
    entities: action.entities.length ? state.entities.concat(action.entities) : state.entities,
  })),

  on(featureActions.LoadEntity, (state): fromFeature.RoleState => ({
    ...state,
    entity: null,
    loading: true,
  })),

  on(featureActions.LoadEntitySuccess, (state, action): fromFeature.RoleState => ({
    ...state,
    entity: action.entity,
    loading: false,
  })),

  on(featureActions.CreateEntity, (state): fromFeature.RoleState => ({
    ...state,
    entity: null,
    loading: true,
  })),

  on(featureActions.CreateEntitySuccess, (state, action): fromFeature.RoleState => ({
    ...state,
    entities: [...state.entities, action.entity],
    entity: action.entity,
    loading: false,
  })),

  on(featureActions.UpdateEntity, (state, action): fromFeature.RoleState => ({
    ...state,
    entity: action.entity,
    loading: true,
  })),

  on(featureActions.UpdateEntitySuccess, (state, action): fromFeature.RoleState => ({
    ...state,
    entities: state.entities.map(role => role.id === action.entity.id ? {...role, ...action.entity} : role),
    entity: action.entity,
    loading: false,
  })),

  on(featureActions.DeleteEntity, (state, action): fromFeature.RoleState => ({
    ...state,
    entity: action.entity,
    loading: true,
  })),

  on(featureActions.DeleteEntitySuccess, (state, action): fromFeature.RoleState => ({
    ...state,
    entities: state.entities.filter(role => role.id !== action.id),
    entity: null,
    loading: false,
  })),
);

export function roleReducer(state: fromFeature.RoleState | undefined, action: Action) {
  return actionReducer(state, action);
}
