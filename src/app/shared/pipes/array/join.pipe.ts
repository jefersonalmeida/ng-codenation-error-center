import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from '../utils/utils';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {

  transform(array: any, separator: string = '', prop = null): any {
    if (!isArray(array)) {
      return array; // if not array return original - can also throw error
    }

    return (!!prop ? array.map(function (item) {
      return item[prop];
    }) : array).join(separator);
  }
}
