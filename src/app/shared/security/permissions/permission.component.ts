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
import { PermissionModalComponent } from './components/permission-modal/permission-modal.component';
import { Permission } from './permission.interface';
import * as fromFeature from './store';

@Component({
  templateUrl: 'permission.component.html',
})
export class PermissionComponent implements OnInit {
  public searchField: FormControl;
  public searchQuery: Search = {orderBy: 'name', sortedBy: 'asc'};
  public modalRef: BsModalRef;
  public entities$: Observable<Permission[]>;
  public loading$: Observable<boolean>;

  constructor(
    public readonly acl: AclService,
    private readonly modalService: ModalService,
    private readonly fb: FormBuilder,
    private readonly store: Store<fromFeature.State>) {

    this.searchField = new FormControl('');
  }

  ngOnInit(): void {
    this.entities$ = this.store.pipe(select(fromFeature.selectEntities));
    this.loading$ = this.store.pipe(select(fromFeature.loading));

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
      per_page: this.searchQuery.per_page || 20,
    };
    this.store.dispatch(
      reset
        ? fromFeature.LoadEntitiesFilter({query: this.searchQuery})
        : fromFeature.LoadEntities({query: this.searchQuery}),
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

  public openEntityDialog(model: Permission) {
    this.modalRef = this.modalService.open(PermissionModalComponent, {
      initialState: {
        form: this.prepareForm(model),
        title: model && model.id ? `Editar Permissão ${model.display_name}` : 'Adicionar Permissão',
      },
    });
    this.modalRef.content.onClose.subscribe((form: FormGroup) => this.save(form));
  }

  public save(form: FormGroup) {
    if (!form || form.invalid) {
      return false;
    }
    const role: Permission = form.value;
    if (role.id) {
      this.store.dispatch(fromFeature.UpdateEntity({entity: role}));
    } else {
      this.store.dispatch(fromFeature.CreateEntity({entity: role}));
    }
  }

  public openDeleteConfirmDialog(role: Permission) {
    this.modalRef = this.modalService.open(ModalConfirmComponent, {
      initialState: {
        listMessages: [
          'Tem certeza que deseja excluir a permissão',
          `${role.name} - ${role.display_name}`,
        ],
        title: 'Confirme sua ação...',
      },
      class: `modal-md modal-dialog-centered modal-danger`,
    });
    this.modalRef.content.onClose.subscribe(res => res && this.store.dispatch(fromFeature.DeleteEntity({entity: role})));
  }

  private prepareForm(model: Permission = null): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(null),
      permission_type: this.fb.control('basic'),
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
