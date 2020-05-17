import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardBackupComponent } from './dashboard-backup.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardBackupComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardBackupRoutingModule {}
