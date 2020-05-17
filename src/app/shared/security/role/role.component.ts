import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { Search } from '../../interfaces/search.interface';
import { AclService } from '../../services/acl.service';
import { ModalService } from '../../services/modal.service';
import { RoleModalComponent } from './components/role-modal/role-modal.component';
import { RolePermissionModalComponent } from './components/role-permission-modal/role-permission-modal.component';
import { Role } from './role.interface';
import { RoleService } from './role.service';
import * as fromRole from './store';

@Component({
  templateUrl: 'role.component.html',
})
export class RoleComponent implements OnInit {
  public searchField: FormControl;
  public searchQuery: Search = {orderBy: 'name', sortedBy: 'asc'};
  public modalRef: BsModalRef;
  public roles$: Observable<Role[]>;
  public loading$: Observable<boolean>;

  constructor(
    public readonly acl: AclService,
    private readonly roleService: RoleService,
    private readonly modalService: ModalService,
    private readonly fb: FormBuilder,
    private readonly store: Store<fromRole.State>) {

    this.searchField = new FormControl('');
  }

  ngOnInit(): void {
    this.roles$ = this.store.pipe(select(fromRole.selectEntities));
    this.loading$ = this.store.pipe(select(fromRole.loading));

    this.search(0, true);

    this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map(res => this.search(0, true)),
    ).subscribe();
  }

  search(page = 0, reset = false) {
    this.searchQuery = {
      search: this.searchField.value,
      orderBy: this.searchQuery.orderBy,
      sortedBy: this.searchQuery.sortedBy,
      current_page: (page + 1),
      per_page: this.searchQuery.per_page || 8,
    };
    this.store.dispatch(
      reset
        ? fromRole.LoadEntitiesFilter({query: this.searchQuery})
        : fromRole.LoadEntities({query: this.searchQuery}),
    );
  }

  public sorted(orderBy: string) {
    let sortedBy = (this.searchQuery.sortedBy === 'asc') ? 'desc' : 'asc';
    sortedBy = this.searchQuery.orderBy !== orderBy ? 'asc' : sortedBy;
    this.searchQuery = {...this.searchQuery, orderBy, sortedBy};
    this.search(0, true);
  }

  public getSortIcon(orderBy: string) {
    if (this.searchQuery.orderBy !== orderBy) {
      return '';
    } else {
      return (this.searchQuery.sortedBy === 'asc') ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    }
  }

  public openEntityDialog(model: Role) {
    this.modalRef = this.modalService.open(RoleModalComponent, {
      initialState: {
        form: this.prepareForm(model),
        title: model && model.id ? `Editar Grupo ${model.display_name}` : 'Adicionar Grupo',
      },
    });
    this.modalRef.content.onClose.subscribe((form: FormGroup) => this.save(form));
  }

  public openPermissionDialog(role: Role) {
    this.modalRef = this.modalService.open(RolePermissionModalComponent, {
      initialState: {
        title: `Permissões do Grupo ${role.display_name}`,
        role: role,
      },
      class: 'modal-xl  modal-dialog-centered',
      ignoreBackdropClick: false,
    });
  }

  save(form: FormGroup) {
    if (!form || form.invalid) {
      return false;
    }
    const entity: Role = form.value;
    if (entity.id) {
      this.store.dispatch(fromRole.UpdateEntity({entity}));
    } else {
      this.store.dispatch(fromRole.CreateEntity({entity}));
    }
  }

  deleteConfirm(role: Role) {
    this.modalRef = this.modalService.open(ModalConfirmComponent, {
      initialState: {
        listMessages: [
          'Tem certeza que deseja excluir o grupo',
          `${role.name} - ${role.display_name}`,
        ],
        title: 'Confirme sua ação...',
      },
      class: `modal-md modal-dialog-centered modal-danger`,
    });
    this.modalRef.content.onClose.subscribe(res => res && this.store.dispatch(fromRole.DeleteEntity({entity: role})));
  }

  private prepareForm(model: Role = null): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      display_name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      description: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
    });

    if (model && model.id) {
      form.patchValue(model);
    }
    return form;
  }
}
