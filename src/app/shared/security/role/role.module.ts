import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { SharedModule } from '../../shared.module';
import { RoleListComponent } from './components/list/role-list.component';
import { RoleModalComponent } from './components/role-modal/role-modal.component';
import { RolePermissionModalComponent } from './components/role-permission-modal/role-permission-modal.component';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role.routing.module';
import * as fromFeature from './store';

@NgModule({
  imports: [
    SharedModule,
    RoleRoutingModule,
    StoreModule.forFeature('roles', fromFeature.roleReducer),
    EffectsModule.forFeature([fromFeature.RoleEffects]),
  ],
  declarations: [RoleComponent, RoleListComponent, RoleModalComponent, RolePermissionModalComponent],
  entryComponents: [RoleModalComponent, RolePermissionModalComponent],
  providers: [ModalService],
})
export class RoleModule {
}
