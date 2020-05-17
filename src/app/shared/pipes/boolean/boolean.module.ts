import { NgModule } from '@angular/core';

import {
  IsEqualPipe,
  IsGreaterOrEqualPipe,
  IsGreaterPipe,
  IsIdenticalPipe,
  IsLessOrEqualPipe,
  IsLessPipe,
  IsNotEqualPipe,
  IsNotIdenticalPipe,
} from './conditions.pipe';

import {
  IsArrayPipe,
  IsDefinedPipe,
  IsFunctionPipe,
  IsNilPipe,
  IsNullPipe,
  IsNumberPipe,
  IsObjectPipe,
  IsStringPipe,
  IsUndefinedPipe,
} from './types.pipe';

@NgModule({
  declarations: [
    IsGreaterPipe,
    IsGreaterOrEqualPipe,
    IsLessPipe,
    IsLessOrEqualPipe,
    IsEqualPipe,
    IsNotEqualPipe,
    IsIdenticalPipe,
    IsNotIdenticalPipe,
    IsNilPipe,
    IsNullPipe,
    IsUndefinedPipe,
    IsFunctionPipe,
    IsNumberPipe,
    IsStringPipe,
    IsArrayPipe,
    IsObjectPipe,
    IsDefinedPipe,
  ],
  exports: [
    IsGreaterPipe,
    IsGreaterOrEqualPipe,
    IsLessPipe,
    IsLessOrEqualPipe,
    IsEqualPipe,
    IsNotEqualPipe,
    IsIdenticalPipe,
    IsNotIdenticalPipe,
    IsNilPipe,
    IsNullPipe,
    IsUndefinedPipe,
    IsFunctionPipe,
    IsNumberPipe,
    IsStringPipe,
    IsArrayPipe,
    IsObjectPipe,
    IsDefinedPipe,
  ],
})
export class NgBooleanPipesModule {
}

