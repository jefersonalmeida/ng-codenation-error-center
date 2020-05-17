import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../utils/utils';

@Pipe({
  name: 'document',
})
export class DocumentPipe implements PipeTransform {
  transform(input: any): any {

    if (!isString(input)) {
      return input;
    } else {
      const value = input.toString();
      if (value.length === 11) {
        return this.formatCPF(value);
      } else if (value.length === 14) {
        return this.formatCNPJ(value);
      }
    }
  }

  private formatCPF(value) {
    return value.substring(0, 3).concat('.')
    .concat(value.substring(3, 6))
    .concat('.')
    .concat(value.substring(6, 9))
    .concat('-')
    .concat(value.substring(9, 11));
  }

  private formatCNPJ(value) {
    return value.substring(0, 2).concat('.')
    .concat(value.substring(2, 5))
    .concat('.')
    .concat(value.substring(5, 8))
    .concat('/')
    .concat(value.substring(8, 12))
    .concat('-')
    .concat(value.substring(12, 14));
  }
}
