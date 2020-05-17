import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="form" autocomplete="off" novalidate>
        <div class="row">
          <app-template-form class="col-md-6" label="ID">
            <input formControlName="name"
                   type="text"
                   class="form-control"
                   placeholder="Identificador"
                   [readOnly]="form.get('id').value"
                   appUpperCase>
          </app-template-form>

          <app-template-form class="col-md-6" label="Nome">
            <input formControlName="display_name"
                   type="text"
                   class="form-control"
                   placeholder="Nome"
                   appUpperCase>
          </app-template-form>

          <app-template-form class="col-md-12 ui-fluid" label="Descrição">
            <textarea formControlName="description"
                      class="form-control"
                      placeholder="Descrição"
                      rows="2"
                      appUpperCase>
            </textarea>
          </app-template-form>
        </div>
      </form>
    </div>
    <div class="modal-footer">
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
    </div>
  `,
})
export class RoleModalComponent implements OnInit {
  public title: string;
  public form: FormGroup;
  public onClose: Subject<FormGroup>;

  constructor(public bsModalRef: BsModalRef) {
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(this.form);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
