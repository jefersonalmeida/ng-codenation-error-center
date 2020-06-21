import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { LogFormModalComponent } from './components/modal/log-form-modal.component';
import { Log } from './log.interface';
import * as fromFeature from './store';
import { Search } from '../../shared/interfaces/search.interface';
import { AclService } from '../../shared/services/acl.service';
import { ModalService } from '../../shared/services/modal.service';
import { ModalConfirmComponent } from '../../shared/components/modal-confirm/modal-confirm.component';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'log.component.html',
})
export class LogComponent implements OnInit {
  public searchField: FormControl;
  public searchLevel: FormControl;
  public searchQuery: Search = { order: 'date', sort: 'desc' };
  public modalRef: BsModalRef;
  public entities$: Observable<Log[]>;
  public loading$: Observable<boolean>;
  public levels = environment.levels;

  constructor(
    public readonly acl: AclService,
    private readonly modalService: ModalService,
    private readonly fb: FormBuilder,
    private readonly store: Store<fromFeature.State>) {

    this.searchField = new FormControl('');
    this.searchLevel = new FormControl('');
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

    this.searchLevel.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map(res => {
        this.searchField.reset();
        this.search(0, true);
      }),
    ).subscribe();
  }

  search(page = 0, reset = false) {
    this.searchQuery = {
      search: this.searchField.value,
      level: this.searchLevel.value,
      order: this.searchQuery.order || 'date',
      sort: this.searchQuery.sort || 'desc',
      number: page,
      size: this.searchQuery.size || 20,
    };
    this.store.dispatch(
      reset
        ? fromFeature.LoadEntitiesFilter({ query: this.searchQuery })
        : fromFeature.LoadEntities({ query: this.searchQuery }),
    );
  }

  public sorted(order: string) {
    let sort = (this.searchQuery.sort === 'asc') ? 'desc' : 'asc';
    sort = this.searchQuery.order !== order ? 'asc' : sort;
    this.searchQuery = { ...this.searchQuery, order, sort };
    this.search(0, true);
  }

  public openEntityViewDialog(model: Log) {
    this.store.dispatch(fromFeature.LoadEntity({ id: model.id }));
  }

  public openEntityDialog(model: Log) {
    this.modalRef = this.modalService.open(LogFormModalComponent, {
      class: `modal-lg modal-dialog-centered`,
      initialState: {
        form: this.prepareForm(model),
        title: model && model.id ? `Editar Log ${model.description}` : 'Adicionar Log',
      },
    });
    this.modalRef.content.onClose.subscribe((form: FormGroup) => this.save(form));
  }

  public save(form: FormGroup) {
    if (!form || form.invalid) {
      return false;
    }
    const log: Log = form.value;
    if (log.id) {
      // this.store.dispatch(fromFeature.UpdateEntity({result: log}));
      return false;
    } else {
      this.store.dispatch(fromFeature.CreateEntity({ entity: log }));
    }
  }

  public openDeleteConfirmDialog(role: Log) {
    this.modalRef = this.modalService.open(ModalConfirmComponent, {
      initialState: {
        listMessages: [
          'Tem certeza que deseja excluir o log',
          `${role.level} - ${role.description}`,
        ],
        title: 'Confirme sua ação...',
      },
      class: `modal-md modal-dialog-centered modal-danger`,
    });
    this.modalRef.content.onClose.subscribe(res => res && this.store.dispatch(fromFeature.DeleteEntity({ entity: role })));
  }

  private prepareForm(model: Log = null): FormGroup {
    const form = this.fb.group({
      level: this.fb.control(environment.levels[1].id),
      description: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      log: this.fb.control(null, [
        Validators.required,
      ]),
      origin: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      date: this.fb.control(new Date(), [
        Validators.required,
      ]),
    });

    if (model && model.id) {
      form.patchValue({ ...model, date: new Date(model.date) });
    }
    return form;
  }
}
