import * as Store from '../../../../store';
import { Search } from '../../../interfaces/search.interface';
import { Permission } from '../permission.interface';

export interface PermissionState {
  entities: Permission[];
  entity: Permission;
  loading: boolean;
  query: Search;
}

export interface State extends Store.AppState {
  permissions: PermissionState;
}

export * from './permission.actions';
export * from './permission.effects';
export * from './permission.reducer';
export * from './permission.selector';

