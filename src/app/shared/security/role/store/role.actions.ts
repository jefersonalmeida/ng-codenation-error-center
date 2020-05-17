import { createAction, props } from '@ngrx/store';
import { Search } from '../../../interfaces/search.interface';
import { Role } from '../role.interface';

export const LoadEntities = createAction('[@role] LoadEntities', props<{ query: Search }>());
export const LoadEntitiesFilter = createAction('[@role] LoadEntitiesFilter', props<{ query: Search }>());
export const LoadEntitiesSuccess = createAction('[@role] LoadEntitiesSuccess', props<{ entities: Role[], query: Search }>());

export const LoadEntity = createAction('[@role] LoadEntity', props<{ id: number }>());
export const LoadEntitySuccess = createAction('[@role] LoadEntitySuccess', props<{ entity?: Role }>());

export const CreateEntity = createAction('[@role] CreateEntity', props<{ entity: Role }>());
export const CreateEntitySuccess = createAction('[@role] CreateEntitySuccess', props<{ entity: Role }>());

export const UpdateEntity = createAction('[@role] UpdateEntity', props<{ entity: Role }>());
export const UpdateEntitySuccess = createAction('[@role] UpdateEntitySuccess', props<{ entity: Role }>());

export const DeleteEntity = createAction('[@role] DeleteEntity', props<{ entity: Role }>());
export const DeleteEntitySuccess = createAction('[@role] DeleteEntitySuccess', props<{ id: number }>());
