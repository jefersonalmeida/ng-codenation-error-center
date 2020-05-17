import { NgModule } from '@angular/core';
import { DefaultsPipe } from './defaults.pipe';
import { KeysPipe } from './keys.pipe';
import { ToArrayPipe } from './to-array.pipe';


@NgModule({
  declarations: [
    KeysPipe,
    ToArrayPipe,
    DefaultsPipe,
  ],
  exports: [
    KeysPipe,
    ToArrayPipe,
    DefaultsPipe,
  ],
})
export class NgObjectPipesModule {
}
