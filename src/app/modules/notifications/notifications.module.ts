// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertsComponent } from './alerts.component';

import { BadgesComponent } from './badges.component';
import { ModalsComponent } from './modals.component';
// Notifications Routing
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    AlertsComponent,
    BadgesComponent,
    ModalsComponent
  ]
})
export class NotificationsModule { }
