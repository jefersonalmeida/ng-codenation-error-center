import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[appUpperCase]:not([appLowerCase]),textarea[appUpperCase]:not([appLowerCase])',
})
export class UppercaseDirective {

  @Input() appUpperCase: string;

  private static dispatchEvent(el, eventType) {
    const event = document.createEvent('Event');
    event.initEvent(eventType, false, false);
    el.dispatchEvent(event);

  }

  private static getCaret(el) {
    return {
      start: el.selectionStart,
      end: el.selectionEnd,
    };

  }

  private static setCaret(el, start, end) {
    el.selectionStart = start;
    el.selectionEnd = end;
    el.focus();
  }

  private static convertValue(el, value) {
    el.value = value.toUpperCase();
    UppercaseDirective.dispatchEvent(el, 'input');

  }

  @HostListener('blur', ['$event.target', '$event.target.value'])
  onBlur(el: any, value: string): void {
    if ((!this.appUpperCase || 'blur' === this.appUpperCase) && 'function' === typeof value.toUpperCase && value.toUpperCase() !== value) {
      UppercaseDirective.convertValue(el, value);
      UppercaseDirective.dispatchEvent(el, 'blur'); // in case updateOn is set to blur
    }
  }

  @HostListener('input', ['$event.target', '$event.target.value'])
  onInput(el: any, value: string): void {
    if (!this.appUpperCase && 'function' === typeof value.toUpperCase && value.toUpperCase() !== value) {
      let {start, end} = UppercaseDirective.getCaret(el);
      if (value[0] === ' ' && start === 1 && end === 1) {
        start = 0;
        end = 0;
      }
      UppercaseDirective.convertValue(el, value);
      UppercaseDirective.setCaret(el, start, end);
    }
  }
}
