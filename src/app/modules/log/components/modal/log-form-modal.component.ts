import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

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

          <app-template-form class="col-md-6" label="Nível">
            <ng-select appearance="outline" [searchable]="false" [clearable]="false" labelForId="level" formControlName="level">
              <ng-option *ngFor="let level of levels" [value]="level.id">
                <i class="{{level.icon}} mr-2"></i> <strong>{{level.name}}</strong>
              </ng-option>
            </ng-select>
          </app-template-form>

          <app-template-form class="col-md-6" label="Data">
            <app-utc-datepicker formControlName="date" placeholder="Data"></app-utc-datepicker>
          </app-template-form>

          <app-template-form class="col-md-6" label="Descrição">
            <input formControlName="description"
                   type="text"
                   class="form-control"
                   placeholder="Descrição">
          </app-template-form>

          <app-template-form class="col-md-6" label="Origem">
            <input formControlName="origin"
                   type="text"
                   class="form-control"
                   placeholder="Origem do evento">
          </app-template-form>

          <app-template-form class="col-md-12 ui-fluid" label="Log Trace">
            <textarea formControlName="log"
                      class="form-control"
                      placeholder="Log Trace"
                      rows="5">
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
export class LogFormModalComponent implements OnInit {
  public title: string;
  public form: FormGroup;
  public levels = environment.levels.filter(l => l.id !== '');
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
