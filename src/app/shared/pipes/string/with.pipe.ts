import { Pipe, PipeTransform } from '@angular/core';
import { isNull, isString } from '../utils/utils';

@Pipe({name: 'with'})
export class WithPipe implements PipeTransform {

  transform(input: string, start: string | null = null, ends: string | null = null, csensitive: boolean = false): any {

    if (!isString(input) || (isNull(start) && isNull(ends)) || (start === '') || (ends === '')) {
      return input;
    }

    input = (csensitive) ? input : input.toLowerCase();

    if (!isNull(start) && !isNull(ends)) {
      const a: boolean = !input.indexOf((csensitive) ? start : start.toLowerCase());
      const b: boolean = input.indexOf((csensitive) ? ends : ends.toLowerCase(), (input.length - ends.length)) !== -1;

      return a === true && b === true;
    }

    if (!isNull(start)) {
      return !input.indexOf((csensitive) ? start : start.toLowerCase());
    }

    if (!isNull(ends)) {
      const position: any = input.length - ends.length;

      return input.indexOf((csensitive) ? ends : ends.toLowerCase(), position) !== -1;
    }
  }
}
