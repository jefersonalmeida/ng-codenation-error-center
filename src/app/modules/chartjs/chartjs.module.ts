import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartJSRoutingModule } from './chartjs-routing.module';

import { ChartJSComponent } from './chartjs.component';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
