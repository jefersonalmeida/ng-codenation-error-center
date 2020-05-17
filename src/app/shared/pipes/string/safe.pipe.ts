import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { isString } from '../utils/utils';


@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(input: string, type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    if (!isString(input)) {
      return input;
    }
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(input);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(input);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(input);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(input);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(input);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
