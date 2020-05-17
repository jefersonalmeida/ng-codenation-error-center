import { createAction, props } from '@ngrx/store';
import { Search } from '../../../interfaces/search.interface';
import { Permission } from '../permission.interface';

export const LoadEntities = createAction('[@permission] LoadEntities', props<{ query: Search }>());
export const LoadEntitiesFilter = createAction('[@permission] LoadEntitiesFilter', props<{ query: Search }>());
export const LoadEntitiesSuccess = createAction('[@permission] LoadEntitiesSuccess', props<{ entities: Permission[], query: Search }>());

export const LoadEntity = createAction('[@permission] LoadEntity', props<{ id: number }>());
export const LoadEntitySuccess = createAction('[@permission] LoadEntitySuccess', props<{ entity?: Permission }>());

export const CreateEntity = createAction('[@permission] CreateEntity', props<{ entity: Permission }>());
export const CreateEntitySuccess = createAction('[@permission] CreateEntitySuccess', props<{ entity: Permission }>());

export const UpdateEntity = createAction('[@permission] UpdateEntity', props<{ entity: Permission }>());
export const UpdateEntitySuccess = createAction('[@permission] UpdateEntitySuccess', props<{ entity: Permission }>());

export const DeleteEntity = createAction('[@permission] DeleteEntity', props<{ entity: Permission }>());
export const DeleteEntitySuccess = createAction('[@permission] DeleteEntitySuccess', props<{ id: number }>());
