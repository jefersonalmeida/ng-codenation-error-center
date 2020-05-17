import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { SharedModule } from '../../shared.module';
import { PermissionListComponent } from './components/list/permission-list.component';
import { PermissionModalComponent } from './components/permission-modal/permission-modal.component';
import { PermissionComponent } from './permission.component';
import { PermissionRoutingModule } from './permission.routing.module';
import * as fromFeature from './store';

@NgModule({
  imports: [
    SharedModule,
    PermissionRoutingModule,
    StoreModule.forFeature('permissions', fromFeature.permissionReducer),
    EffectsModule.forFeature([fromFeature.PermissionEffects]),
  ],
  declarations: [PermissionComponent, PermissionListComponent, PermissionModalComponent],
  entryComponents: [PermissionModalComponent],
  providers: [ModalService],
})
export class PermissionModule {
}
