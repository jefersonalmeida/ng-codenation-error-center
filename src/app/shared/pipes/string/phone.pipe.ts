import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../utils/utils';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(input: any): any {

    if (!isString(input)) {
      return input;
    } else {
      const value = input.toString();
      if (value.length === 13) {
        return '+' + value
        .substring(0, 2)
        .concat('-')
        .concat(value.substring(2, 4))
        .concat('-')
        .concat(value.substring(4, 9))
        .concat('-')
        .concat(value.substring(9, 13))
        .toString();
      } else if (value.length === 11) {
        return value.substring(0, 2)
        .concat('-')
        .concat(value.substring(2, 7))
        .concat('-')
        .concat(value.substring(7, 11))
        .toString();
      } else if (value.length === 10) {
        return value.substring(0, 2)
        .concat('-')
        .concat(value.substring(2, 6))
        .concat('-')
        .concat(value.substring(6, 10))
        .toString();
      }
    }
  }
}
