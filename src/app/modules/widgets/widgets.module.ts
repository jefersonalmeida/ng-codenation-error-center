import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WidgetsRoutingModule } from './widgets-routing.module';

import { WidgetsComponent } from './widgets.component';

@NgModule({
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
