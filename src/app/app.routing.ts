import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './modules/error/404.component';
import { P500Component } from './modules/error/500.component';
import { AuthGuard } from './shared/guards/auth.guard';

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
  { path: '404', component: P404Component, data: { title: 'Não encontrado 404' } },
  { path: '500', component: P500Component, data: { title: 'Erro no servidor 500' } },
  {
    path: '', component: DefaultLayoutComponent, data: { title: 'Home' }, children: [
      /*{
        path: 'security',
        loadChildren: () => import('./shared/security/security.module').then(m => m.SecurityModule),
        canActivate: [AuthGuard],
      },*/
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'logs',
        loadChildren: () => import('./modules/log/log.module').then(m => m.LogModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
