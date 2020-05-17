import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardBackupRoutingModule } from './dashboard-backup-routing.module';

import { DashboardBackupComponent } from './dashboard-backup.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardBackupRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardBackupComponent ]
})
export class DashboardBackupModule { }
