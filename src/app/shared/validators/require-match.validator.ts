import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RequireMatchValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return {match_select: true};
    }
    return null;
  }
}
