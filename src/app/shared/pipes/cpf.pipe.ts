import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../utils/util';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(input: any): any {

    if (!isString(input)) {
      return input;
    } else {
      const value = input.toString();
      if (value.length === 11) {
        return value.substring(0, 3).concat('.')
        .concat(value.substring(3, 6))
        .concat('.')
        .concat(value.substring(6, 9))
        .concat('-')
        .concat(value.substring(9, 11));
      }
    }
  }
}
