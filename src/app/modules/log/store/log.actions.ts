import { createAction, props } from '@ngrx/store';
import { Log } from '../log.interface';
import { Search } from '../../../shared/interfaces/search.interface';
import { ResponseEntity, ResponsePageable } from '../../../shared/interfaces/response.interface';

export const LoadEntities = createAction('[@log] LoadEntities', props<{ query: Search }>());
export const LoadEntitiesFilter = createAction('[@log] LoadEntitiesFilter', props<{ query: Search }>());
export const LoadEntitiesSuccess = createAction('[@log] LoadEntitiesSuccess', props<{ result: ResponsePageable<Log> }>());

export const LoadEntity = createAction('[@log] LoadEntity', props<{ id: string }>());
export const LoadEntitySuccess = createAction('[@log] LoadEntitySuccess', props<{ result?: ResponseEntity<Log> }>());

export const CreateEntity = createAction('[@log] CreateEntity', props<{ entity: Log }>());
export const CreateEntitySuccess = createAction('[@log] CreateEntitySuccess', props<{ result: ResponseEntity<Log> }>());

export const UpdateEntity = createAction('[@log] UpdateEntity', props<{ entity: Log }>());
export const UpdateEntitySuccess = createAction('[@log] UpdateEntitySuccess', props<{ result: ResponseEntity<Log> }>());

export const DeleteEntity = createAction('[@log] DeleteEntity', props<{ entity: Log }>());
export const DeleteEntitySuccess = createAction('[@log] DeleteEntitySuccess', props<{ id: string }>());
