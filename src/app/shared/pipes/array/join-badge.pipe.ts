import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from '../utils/utils';

@Pipe({
  name: 'joinBadge',
})
export class JoinBadgePipe implements PipeTransform {

  transform(array: any, prop = null, classBadge = 'primary'): any {
    if (!isArray(array)) {
      return array; // if not array return original - can also throw error
    }

    return (!!prop ? array.map(function (item) {
      return `<span class="badge badge-${classBadge}">${item[prop]}</span>`;
    }) : array).join(' ');
  }
}
