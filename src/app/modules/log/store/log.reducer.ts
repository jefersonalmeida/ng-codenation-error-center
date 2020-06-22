import { Action, createReducer, on } from '@ngrx/store';
import * as fromFeature from '.';
import * as featureActions from './log.actions';
import { ResponseEntity, ResponsePageable } from '../../../shared/interfaces/response.interface';
import { Log } from '../log.interface';
import { TypedAction } from '@ngrx/store/src/models';

const initialState: fromFeature.LogState = {
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

function getQuery<S>(
  state: fromFeature.LogState,
  action: { result: ResponseEntity<ResponsePageable<Log>> } & TypedAction<string> & { type: string }) {
  const { number, size, totalElements, totalPages } = action.result.data;
  return { ...state.query, number, size, totalElements, totalPages };
}

const actionReducer = createReducer(
  initialState,

  on(featureActions.LoadEntities, (state, action): fromFeature.LogState => ({
    ...state,
    entity: null,
    loading: true,
    query: action.query,
  })),

  on(featureActions.LoadEntitiesFilter, (state, action): fromFeature.LogState => ({
    ...state,
    entity: null,
    entities: [],
    loading: true,
    query: action.query,
  })),

  on(featureActions.LoadEntitiesSuccess, (state, action): fromFeature.LogState => ({
    ...state,
    entity: null,
    loading: false,
    query: getQuery(state, action),
    entities: action.result.data.content.length
      ? state.entities.concat(action.result.data.content)
      : state.entities,
  })),

  on(featureActions.LoadEntity, (state): fromFeature.LogState => ({
    ...state,
    entity: null,
    loading: true,
  })),

  on(featureActions.LoadEntitySuccess, (state, action): fromFeature.LogState => ({
    ...state,
    entity: action.result.data,
    loading: false,
  })),

  on(featureActions.CreateEntity, (state): fromFeature.LogState => ({
    ...state,
    entity: null,
    loading: true,
  })),

  on(featureActions.CreateEntitySuccess, (state, action): fromFeature.LogState => ({
    ...state,
    entities: state.entities,
    entity: action.result.data,
    loading: false,
  })),

  on(featureActions.UpdateEntity, (state, action): fromFeature.LogState => ({
    ...state,
    entity: action.entity,
    loading: true,
  })),

  on(featureActions.UpdateEntitySuccess, (state, action): fromFeature.LogState => ({
    ...state,
    entities: state.entities.map(entity => entity.id === action.result.data.id ? { ...entity, ...action.result.data } : entity),
    entity: action.result.data,
    loading: false,
  })),

  on(featureActions.DeleteEntity, (state, action): fromFeature.LogState => ({
    ...state,
    entity: action.entity,
    loading: true,
  })),

  on(featureActions.DeleteEntitySuccess, (state, action): fromFeature.LogState => ({
    ...state,
    entities: state.entities.filter(entity => entity.id !== action.id),
    entity: null,
    loading: false,
  })),
);

export function logReducer(state: fromFeature.LogState | undefined, action: Action) {
  return actionReducer(state, action);
}
