import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security.routing.module';

@NgModule({
  imports: [SharedModule, SecurityRoutingModule],
  declarations: [SecurityComponent],
})
export class SecurityModule {
}
