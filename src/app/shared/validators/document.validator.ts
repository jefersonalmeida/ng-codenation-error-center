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
    // Faz a soma dos dí­gitos com a posição
    // Ex. para 10 posições:
    //   0    2    5    4    6    2    8    8   4
    // x10   x9   x8   x7   x6   x5   x4   x3  x2
    //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < digits.length; i++) {
      // Preenche a soma com o dígito vezes a posição
      sumDigits = sumDigits + (digits[i] * position);
      // Subtrai 1 da posição
      position--;
      // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
      if (position < 2) {
        // Retorno a posição para 9
        position = 9;
      }
    }
    // Captura o resto da divisão entre sumDigits dividido por 11
    // Ex.: 196 % 11 = 9
    sumDigits = sumDigits % 11;

    // Verifica se sumDigits são menor que 2
    if (sumDigits < 2) {
      // sumDigits agora serÃ¡ zero
      sumDigits = 0;
    } else {
      // Se for maior que 2, o resultado é 11 menos sumDigits
      // Ex.: 11 - 9 = 2
      // Nosso di­gito procurado é 2
      sumDigits = 11 - sumDigits;
    }
    // Concatena mais um di­gito aos primeiro nove digitos
    // Ex.: 025462884 + 2 = 0254628842
    // Retorna
    return digits + sumDigits;
  }

  private static isCPF(value) {
    // Captura os 9 primeiros di­gitos do CPF Ex.: 02546288423 = 025462884
    const digits = value.substr(0, 9);
    let newValue = DocumentValidator.buildDigit(digits);
    newValue = DocumentValidator.buildDigit(newValue, 11);
    return newValue === value;
  }

  private static isCNPJ(valor) {
    const documentOrigin = valor;
    // Captura os primeiros 12 numeros do CNPJ
    const primeNumbers = valor.substr(0, 12);
    // Faz o primeiro calculo
    const calcOne = DocumentValidator.buildDigit(primeNumbers, 5);
    // O segundo calculo é a mesma coisa do primeiro, porém, começa na posição 6
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
