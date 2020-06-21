import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './log.component';

export const routes: Routes = [
  {
    path: '', component: LogComponent, data: { title: 'Logs' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogRoutingModule {
}
