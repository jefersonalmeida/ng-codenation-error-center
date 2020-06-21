import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { CnpjPipe } from './cnpj.pipe';
import { CpfPipe } from './cpf.pipe';
import { PhonePipe } from './phone.pipe';

const APP_PIPES = [
  CapitalizePipe,
  CnpjPipe,
  CpfPipe,
  PhonePipe,
];

@NgModule({
  declarations: [...APP_PIPES],
  exports: [...APP_PIPES],
})
export class PipesModule {
}
