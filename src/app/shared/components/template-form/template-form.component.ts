import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  template: `
    <div class="form-group has-feedback" [class.has-success]="hasSuccess()" [class.has-error]="hasError()">
      <label *ngIf="label" class="{{classLabel}}" for="{{input.name}}">{{label}}</label>
      <ng-content></ng-content>
      <!--<div *ngIf="hasSuccess()" class="ui-message ui-messages-success">OK</div>-->
      <app-template-form-errors [control]="input"></app-template-form-errors>
    </div>
  `
})
export class TemplateFormComponent implements OnInit, AfterContentInit {

  input: any;
  @Input() label: string;
  @Input() classLabel = 'form-col-form-label';

  @ContentChild(NgModel, {static: false}) model: NgModel;
  @ContentChild(FormControlName, {static: false}) control: FormControlName;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Este componente precisa ser usado com uma diretiva NgModel ou FormControlName');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}
