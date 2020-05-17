import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AclService } from '../../../../services/acl.service';
import { Role } from '../../role.interface';

@Component({
  selector: 'app-role-list',
  templateUrl: 'role-list.component.html',
})
export class RoleListComponent {
  @Input() acl: AclService;
  @Input() roles: Role[];

  @Output() openPermissionDialog = new EventEmitter<Role>();
  @Output() openEntityDialog = new EventEmitter<Role>();
  @Output() openDeleteConfirmDialog = new EventEmitter<Role>();
  @Output() sorted = new EventEmitter<string>();
  @Output() getSortIcon = new EventEmitter<string>();

  public eventSorted(orderBy: string) {
    this.sorted.emit(orderBy);
  }

  public eventSortIcon(orderBy: string) {
    this.getSortIcon.emit(orderBy);
  }

  public eventOpenEntityDialog(role: Role) {
    this.openEntityDialog.emit(role);
  }

  public eventOpenPermissionDialog(role: Role) {
    this.openPermissionDialog.emit(role);
  }

  public eventOpenDeleteConfirmDialog(role: Role) {
    this.openDeleteConfirmDialog.emit(role);
  }
}
