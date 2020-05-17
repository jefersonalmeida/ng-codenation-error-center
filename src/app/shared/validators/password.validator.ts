import { FormGroup, ValidationErrors } from '@angular/forms';

export class PasswordValidator {

  static matchPassword(passwordKey: string, passwordConfirmationKey: string): ValidationErrors | null {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({match_password: true});
      }
    };
  }
}
