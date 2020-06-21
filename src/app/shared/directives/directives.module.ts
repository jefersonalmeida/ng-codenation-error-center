import { NgModule } from '@angular/core';
import { LowercaseDirective } from './lowercase.directive';
import { UppercaseDirective } from './uppercase.directive';

const APP_DIRECTIVES = [
  LowercaseDirective,
  UppercaseDirective,
];

@NgModule({
  declarations: [...APP_DIRECTIVES],
  exports: [...APP_DIRECTIVES],
})
export class DirectivesModule {
}
