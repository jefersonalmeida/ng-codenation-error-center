import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Search } from '../../../../interfaces/search.interface';
import { Permission } from '../../../permissions/permission.interface';
import { PermissionService } from '../../../permissions/permission.service';
import { Role } from '../../role.interface';
import { RoleService } from '../../role.service';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="permissions?.length" class="tree">
        <li *ngFor="let entity of permissions" class="col-md-6 col-lg-4">
          <label class="switch switch-sm switch-3d switch-success pt-1 mt-0 mb-0 mr-3">
            <input type="checkbox"
                   (change)="isPermission(entity)"
                   [checked]="checkPermission(entity)"
                   class="switch-input">
            <span class="switch-slider"></span>
          </label>
          <span placement="top" tooltip="{{entity.display_name}}">{{entity.display_name}}</span>
        </li>
      </ul>
    </div>
    <!--<div class="modal-footer">
      <div class="btn-group">
        <button type="button"
                class="btn btn-secondary"
                (click)="onCancel()"><i class="fa fa-remove mr-2"></i>Cancelar
        </button>
        <button type="button"
                class="btn btn-success"
                (click)="onConfirm()"
                [disabled]="form.invalid"><i class="fa fa-save mr-2"></i>Salvar
        </button>
      </div>
    </div>-->
  `,
})
export class RolePermissionModalComponent implements OnInit {
  public title: string;
  public role: Role;
  public onClose: Subject<any>;
  public searchQuery: Search;
  permissions: Permission[];

  constructor(public readonly bsModalRef: BsModalRef,
              public readonly rolesService: RoleService,
              public readonly permissionsService: PermissionService) {

    this.searchQuery = {
      search: '',
      orderBy: 'display_name',
      sortedBy: 'asc',
      current_page: 0,
      per_page: 100,
    };

    this.permissionsService.index(this.searchQuery).pipe(
      map(res => this.permissions = res.data),
    ).subscribe();
  }

  public ngOnInit(): void {
    this.onClose = new Subject();

    this.rolesService.find(this.role.id).pipe(
      map(res => this.role = res),
    ).subscribe();
  }

  checkPermission(model: Permission) {
    if (this.role && this.role.permissions) {
      return this.role.permissions.data.some(e => e.id === model.id);
    }
  }

  isPermission(model: Permission) {
    this.rolesService.updatePermission(model, this.role.id).subscribe();
  }

  public onConfirm(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
