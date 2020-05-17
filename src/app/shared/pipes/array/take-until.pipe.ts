import { Pipe, PipeTransform } from '@angular/core';
import { CollectionPredicate, isArray, isNil, takeUntil } from '../utils/utils';

@Pipe({
  name: 'takeUntil',
})
export class TakeUntilPipe implements PipeTransform {

  transform(input: any, predicate?: CollectionPredicate): any {

    if (!isArray(input) || isNil(predicate)) {
      return input;
    }

    return takeUntil(input, predicate);
  }
}
