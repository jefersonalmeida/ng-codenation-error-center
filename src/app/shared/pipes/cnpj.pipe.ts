import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../utils/util';

@Pipe({
  name: 'cnpj',
})
export class CnpjPipe implements PipeTransform {
  transform(input: any): any {

    if (!isString(input)) {
      return input;
    } else {
      const value = input.toString();
      if (value.length === 14) {
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
  }
}
