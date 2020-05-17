import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="listMessages.length">
        <li *ngFor="let item of listMessages"><strong>{{item}}</strong></li>
      </ul>
    </div>
    <div class="modal-footer btn-group">
      <button type="button" class="btn btn-secondary" (click)="onCancel()"><i class="fa fa-remove mr-2"></i>Cancelar</button>
      <button type="button" class="btn btn-success" (click)="onConfirm()"><i class="fa fa-check mr-2"></i>Confirmar</button>
    </div>
  `,
})
export class ModalConfirmComponent implements OnInit {
  title: string;
  listMessages: any[] = [];
  public onClose: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
