import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Log } from '../../log.interface';
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
      <tabset>
        <tab>
          <ng-template tabHeading><i class="fa fa-tasks"></i> Detalhes</ng-template>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <i class="{{getLevel(entity?.level).icon}}"></i> <span>{{getLevel(entity?.level).name}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Descrição:</strong> <span>{{entity?.description}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Origem:</strong> <span>{{entity?.origin}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Data:</strong> <span>{{entity?.date | date :'short'}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Quantidade:</strong> <span>{{entity?.quantity}}</span>
            </li>
          </ul>
        </tab>
        <tab>
          <ng-template tabHeading><i class="fa fa-bug"></i> Log Trace</ng-template>
          <pre>{{entity?.log}}</pre>
        </tab>
        <tab>
          <ng-template tabHeading><i class="fa fa-users"></i> Extra</ng-template>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Cadastrado em:</strong> <span>{{entity?.created_at | date :'short'}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Registrado por:</strong> <span>{{entity?.created_by}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Atualizado por:</strong> <span>{{entity?.last_modified_by}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <strong>Atualizado em:</strong> <span>{{entity?.last_modified_at | date :'short'}}</span>
            </li>
          </ul>
        </tab>
      </tabset>
    </div>
    <div class="modal-footer">
      <div class="btn-group">
        <button type="button"
                class="btn btn-secondary"
                (click)="onCancel()"><i class="fa fa-remove mr-2"></i>Fechar
        </button>
      </div>
    </div>
  `,
})
export class LogViewModalComponent implements OnInit {
  public title: string;
  public entity: Log;
  public onClose: Subject<FormGroup>;
  public levels = environment.levels;

  constructor(public bsModalRef: BsModalRef) {
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  public getLevel(level: string) {
    return this.levels.find(l => l.id === level);
  }
}
