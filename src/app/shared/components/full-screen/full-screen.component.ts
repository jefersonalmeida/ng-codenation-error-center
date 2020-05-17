import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';

const document: any = window.document;

@Component({
  selector: 'app-full-screen',
  encapsulation: ViewEncapsulation.None,
  template: `
    <i *ngIf="!toggle" #expand class="icons icon-size-fullscreen"></i>
    <i *ngIf="toggle" #compress class="icons icon-size-actual"></i>
  `,
})
export class FullScreenComponent {
  toggle: boolean = false;
  @ViewChild('expand') private expand: ElementRef;
  @ViewChild('compress') private compress: ElementRef;

  requestFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  @HostListener('click') getFullscreen() {
    if (this.expand) {
      this.requestFullscreen(document.documentElement);
    }
    if (this.compress) {
      this.exitFullscreen();
    }
  }

  @HostListener('window:resize') onFullScreenChange() {
    const fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    this.toggle = fullscreenElement != null;
  }
}
