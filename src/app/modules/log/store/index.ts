import * as Store from '../../../store';
import { Log } from '../log.interface';
import { Search } from '../../../shared/interfaces/search.interface';

export interface LogState {
  entities: Log[];
  entity: Log;
  loading: boolean;
  query: Search;
}

export interface State extends Store.AppState {
  permissions: LogState;
}

export * from './log.actions';
export * from './log.effects';
export * from './log.reducer';
export * from './log.selector';

