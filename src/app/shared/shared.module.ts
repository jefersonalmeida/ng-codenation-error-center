import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localePTBR from '@angular/common/locales/pt';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoDataComponent } from './components/loading/no-data.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TemplateFormErrorsComponent } from './components/template-form/template-form-errors.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { LowercaseDirective } from './directives/lowercase.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { NgPipesModule } from './pipes/pipes.module';

registerLocaleData(localePTBR);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_MODULES = {
  importForRoot: [
    AppBreadcrumbModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      tapToDismiss: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exportFormRoot: [
    AppBreadcrumbModule,
    BsDropdownModule,
    TabsModule,
    ToastrModule,
    ModalModule,
    TypeaheadModule,
    TooltipModule,
  ],
  defaults: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ChartsModule,
    NgPipesModule,
    InfiniteScrollModule,
  ],
  components: [
    TemplateFormComponent,
    TemplateFormErrorsComponent,
    FullScreenComponent,
    PaginationComponent,
    LoadingComponent,
    NoDataComponent
  ],
  directives: [
    UppercaseDirective,
    LowercaseDirective,
  ],
  entry: [
    ModalConfirmComponent,
  ],
};

@NgModule({
  imports: [
    ...APP_MODULES.importForRoot,
    ...APP_MODULES.defaults,
  ],
  exports: [
    ...APP_MODULES.exportFormRoot,
    ...APP_MODULES.defaults,
    ...APP_MODULES.components,
    ...APP_MODULES.entry,
    ...APP_MODULES.directives,
  ],
  declarations: [
    ...APP_MODULES.components,
    ...APP_MODULES.entry,
    ...APP_MODULES.directives,
  ],
  entryComponents: [
    ...APP_MODULES.entry,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
        // {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: LOCALE_ID, useValue: 'pt'},
        // {provide: LocationStrategy, useClass: PathLocationStrategy},
      ],
    };
  }
}
