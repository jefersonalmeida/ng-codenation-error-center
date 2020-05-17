import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[appLowerCase]:not([appUpperCase]),textarea[appLowerCase]:not([appUpperCase])',
})
export class LowercaseDirective {

  @Input() appLowerCase: string;

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
    el.value = value.toLowerCase();
    LowercaseDirective.dispatchEvent(el, 'input');

  }

  @HostListener('blur', ['$event.target', '$event.target.value'])
  onBlur(el: any, value: string): void {
    if ((!this.appLowerCase || 'blur' === this.appLowerCase) && 'function' === typeof value.toLowerCase && value.toLowerCase() !== value) {
      LowercaseDirective.convertValue(el, value);
      LowercaseDirective.dispatchEvent(el, 'blur'); // in case updateOn is set to blur
    }
  }

  @HostListener('input', ['$event.target', '$event.target.value'])
  onInput(el: any, value: string): void {
    if (!this.appLowerCase && 'function' === typeof value.toLowerCase && value.toLowerCase() !== value) {
      let {start, end} = LowercaseDirective.getCaret(el);
      if (value[0] === ' ' && start === 1 && end === 1) {
        start = 0;
        end = 0;
      }
      LowercaseDirective.convertValue(el, value);
      LowercaseDirective.setCaret(el, start, end);
    }
  }
}
