import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LogListComponent } from './components/list/log-list.component';
import { LogFormModalComponent } from './components/modal/log-form-modal.component';
import { LogComponent } from './log.component';
import { LogRoutingModule } from './log.routing.module';
import * as fromFeature from './store';
import { SharedModule } from '../../shared/shared.module';
import { ModalService } from '../../shared/services/modal.service';
import { LogViewModalComponent } from './components/modal/log-view-modal.component';

@NgModule({
  imports: [
    SharedModule,
    LogRoutingModule,
    StoreModule.forFeature('logs', fromFeature.logReducer),
    EffectsModule.forFeature([fromFeature.LogEffects]),
  ],
  declarations: [LogComponent, LogListComponent, LogFormModalComponent, LogViewModalComponent],
  entryComponents: [LogFormModalComponent, LogViewModalComponent],
  providers: [ModalService],
})
export class LogModule {
}
