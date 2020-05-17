import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AclService } from '../../../../services/acl.service';
import { Permission } from '../../permission.interface';

@Component({
  selector: 'app-permission-list',
  templateUrl: 'permission-list.component.html',
})
export class PermissionListComponent {
  @Input() acl: AclService;
  @Input() entities: Permission[];

  @Output() openEntityDialog = new EventEmitter<Permission>();
  @Output() openDeleteConfirmDialog = new EventEmitter<Permission>();
  @Output() sorted = new EventEmitter<string>();
  @Output() getSortIcon = new EventEmitter<string>();

  public eventSorted(orderBy: string) {
    this.sorted.emit(orderBy);
  }

  public eventSortIcon(orderBy: string) {
    this.getSortIcon.emit(orderBy);
  }

  public eventOpenEntityDialog(entity: Permission) {
    this.openEntityDialog.emit(entity);
  }

  public eventOpenDeleteConfirmDialog(entity: Permission) {
    this.openDeleteConfirmDialog.emit(entity);
  }
}
