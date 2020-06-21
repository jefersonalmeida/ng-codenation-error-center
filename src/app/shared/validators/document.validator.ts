import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DocumentValidator {
  static minLength = 11;
  static maxLength = 14;

  static validate(control: AbstractControl): ValidationErrors | null {
    let document = control.value;
    if (document && document.length) {
      document = document.toString();
      document = document.replace(/[^0-9]/g, '');
      if (document && (document.length >= DocumentValidator.minLength && document.length <= DocumentValidator.maxLength)) {
        if ([DocumentValidator.minLength, DocumentValidator.maxLength].indexOf(document.length) < 0) {
          return {length: true};
        }
        if (/^([0-9])\1*$/.test(document)) {
          return {equalDigits: true};
        }
        return !DocumentValidator.isDocument(document) ? {digit: true} : null;
      }
      return null;
    }
  }

  private static buildDigit(digits, position = 10, sumDigits = 0) {
    digits = digits.toString();

    for (let i = 0; i < digits.length; i++) {
      sumDigits = sumDigits + (digits[i] * position);
      position--;
      if (position < 2) {
        position = 9;
      }
    }

    sumDigits = sumDigits % 11;

    if (sumDigits < 2) {
      sumDigits = 0;
    } else {
      sumDigits = 11 - sumDigits;
    }
    return digits + sumDigits;
  }

  private static isCPF(value) {
    const digits = value.substr(0, 9);
    let newValue = DocumentValidator.buildDigit(digits);
    newValue = DocumentValidator.buildDigit(newValue, 11);
    return newValue === value;
  }

  private static isCNPJ(valor) {
    const documentOrigin = valor;
    const primeNumbers = valor.substr(0, 12);
    const calcOne = DocumentValidator.buildDigit(primeNumbers, 5);
    const calcTwo = DocumentValidator.buildDigit(calcOne, 6);
    return calcTwo === documentOrigin;
  }

  private static isDocument(value) {
    value = value.toString();
    value = value.replace(/[^0-9]/g, '');
    if (value.length === DocumentValidator.minLength) {
      return DocumentValidator.isCPF(value);
    } else if (value.length === DocumentValidator.maxLength) {
      return DocumentValidator.isCNPJ(value);
    } else {
      return false;
    }
  }


  /**
   * Implementa a interface de um validator.
   */
  validate(c: AbstractControl): ValidationErrors | null {
    return DocumentValidator.validate(c);
  }
}
