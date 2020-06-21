import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isString } from '../utils/util';

export class RequireMatchValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const selection: any = control.value;
    return isString(selection) ? { match_select: true } : null;
  }
}
