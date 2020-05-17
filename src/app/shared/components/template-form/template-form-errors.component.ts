import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-template-form-errors',
  template: `
    <ul class="error-messages" *ngIf="shouldShowErrors()">
      <li class="ui-message ui-messages-error ui-corner-all" *ngFor="let error of listOfErrors()">
        <i class="fa fa-close"></i> {{error}}
      </li>
    </ul>
  `,
})
export class TemplateFormErrorsComponent {

  private static readonly errorMessages = {
    'length': () => 'Quantidade de caracteres não confere',
    'equalDigits': () => 'Quantidade de caracteres idênticos',
    'digit': () => 'Dígito verificador não confere',
    'match_password': () => 'O campo senha não confere',
    'required': () => 'Este campo é obrigatório',
    'email': () => 'Email inválido',
    'min': (params) => 'O valor mínimo é ' + params.min,
    'max': (params) => 'O valor máximo é ' + params.max,
    'minlength': (params) => 'O número mínimo de caracteres é ' + params.requiredLength,
    'maxlength': (params) => 'O número máximo de caracteres é ' + params.requiredLength,
    'pattern': (params) => 'O padrão requerido é: ' + params.requiredPattern,
    'years': (params) => params.message,
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  private static getMessage(type: string, params: any) {
    return TemplateFormErrorsComponent.errorMessages[type](params);
  }

  shouldShowErrors(): boolean {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors).map(field => TemplateFormErrorsComponent.getMessage(field, this.control.errors[field]));
  }
}
