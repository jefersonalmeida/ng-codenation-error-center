import { NgModule } from '@angular/core';

import { BytesPipe } from './bytes.pipe';
import { CeilPipe } from './ceil.pipe';
import { DegreesPipe } from './degrees.pipe';
import { FloorPipe } from './floor.pipe';
import { PowPipe } from './pow.pipe';
import { RadiansPipe } from './radians.pipe';
import { RandomPipe } from './random.pipe';
import { RoundPipe } from './round.pipe';
import { SqrtPipe } from './sqrt.pipe';

@NgModule({
  declarations: [
    BytesPipe,
    CeilPipe,
    FloorPipe,
    RoundPipe,
    DegreesPipe,
    RadiansPipe,
    RandomPipe,
    SqrtPipe,
    PowPipe,
  ],
  exports: [
    BytesPipe,
    CeilPipe,
    FloorPipe,
    RoundPipe,
    DegreesPipe,
    RadiansPipe,
    RandomPipe,
    SqrtPipe,
    PowPipe,
  ],
})
export class NgMathPipesModule {
}
