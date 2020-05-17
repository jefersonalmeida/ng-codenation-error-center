import * as Store from '../../../../store';
import { Search } from '../../../interfaces/search.interface';
import { Role } from '../role.interface';

export interface RoleState {
  entities: Role[];
  entity: Role;
  loading: boolean;
  query: Search;
}

export interface State extends Store.AppState {
  roles: RoleState;
}

export * from './role.actions';
export * from './role.effects';
export * from './role.reducer';
export * from './role.selector';

