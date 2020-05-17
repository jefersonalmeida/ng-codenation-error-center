import { Pipe, PipeTransform } from '@angular/core';
import { getProperty, isArray } from '../utils/utils';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {

  transform(input: any, key: string): any {

    if (!isArray(input) || !key) {
      return input;
    }

    return input.map((value: any) => {
      return getProperty(value, key);
    });
  }
}
