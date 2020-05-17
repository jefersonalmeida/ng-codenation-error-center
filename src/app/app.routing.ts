import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './modules/error/404.component';
import { P500Component } from './modules/error/500.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./shared/security/auth/auth.module').then(m => m.AuthModule),
  },
  {path: '404', component: P404Component, data: {title: 'Não encontrado 404'}},
  {path: '500', component: P500Component, data: {title: 'Erro no servidor 500'}},
  {
    path: '', component: DefaultLayoutComponent, data: {title: 'Home'}, children: [
      {
        path: 'security',
        loadChildren: () => import('./shared/security/security.module').then(m => m.SecurityModule),
      },
      {
        path: 'base',
        loadChildren: () => import('./modules/base/base.module').then(m => m.BaseModule),
      },
      {
        path: 'buttons',
        loadChildren: () => import('./modules/buttons/buttons.module').then(m => m.ButtonsModule),
      },
      {
        path: 'charts',
        loadChildren: () => import('./modules/chartjs/chartjs.module').then(m => m.ChartJSModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'icons',
        loadChildren: () => import('./modules/icons/icons.module').then(m => m.IconsModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
      },
      {
        path: 'theme',
        loadChildren: () => import('./modules/theme/theme.module').then(m => m.ThemeModule),
      },
      {
        path: 'widgets',
        loadChildren: () => import('./modules/widgets/widgets.module').then(m => m.WidgetsModule),
      },
    ],
  },
  {path: '**', component: P404Component},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
