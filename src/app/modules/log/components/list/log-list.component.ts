import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../log.interface';
import { AclService } from '../../../../shared/services/acl.service';
import { Search } from '../../../../shared/interfaces/search.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-log-list',
  templateUrl: 'log-list.component.html',
})
export class LogListComponent {
  @Input() acl: AclService;
  @Input() entities: Log[];
  @Input() searchQuery: Search;
  public levels = environment.levels;

  @Output() openEntityDialog = new EventEmitter<Log>();
  @Output() openDeleteConfirmDialog = new EventEmitter<Log>();
  @Output() sorted = new EventEmitter<string>();

  public getLevel(level: string) {
    return this.levels.find(l => l.id === level);
  }

  public eventSorted(sort: string) {
    this.sorted.emit(sort);
  }

  public eventOpenEntityDialog(entity: Log) {
    this.openEntityDialog.emit(entity);
  }

  public eventOpenDeleteConfirmDialog(entity: Log) {
    this.openDeleteConfirmDialog.emit(entity);
  }

  public getSortIcon(order: string) {
    if (this.searchQuery.order !== order) {
      return '';
    } else {
      return (this.searchQuery.sort === 'asc') ? 'cui-arrow-top' : 'cui-arrow-bottom';
    }
  }
}
