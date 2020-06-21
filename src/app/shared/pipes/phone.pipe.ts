import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '../utils/util';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  private static format13(value) {
    return '+' + value
      .substring(0, 2)
      .concat('-')
      .concat(value.substring(2, 4))
      .concat('-')
      .concat(value.substring(4, 9))
      .concat('-')
      .concat(value.substring(9, 13))
      .toString();
  }

  private static format11(value) {
    return value.substring(0, 2)
      .concat('-')
      .concat(value.substring(2, 7))
      .concat('-')
      .concat(value.substring(7, 11))
      .toString();
  }

  private static format10(value) {
    return value.substring(0, 2)
      .concat('-')
      .concat(value.substring(2, 6))
      .concat('-')
      .concat(value.substring(6, 10))
      .toString();
  }

  transform(input: any): any {

    if (!isString(input)) {
      return input;
    } else {
      const value = input.toString();
      switch (value.length) {
        case 13:
          PhonePipe.format13(value);
          break;
        case 11:
          PhonePipe.format11(value);
          break;
        case 10:
          PhonePipe.format10(value);
          break;
      }
    }
  }
}
