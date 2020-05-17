import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';

export const routes: Routes = [
  {
    path: '', component: SecurityComponent, data: {title: 'Segurança'}, children: [
      {
        path: 'roles',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
      },
      {
        path: 'permissions',
        loadChildren: () => import('./permissions/permission.module').then(m => m.PermissionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {
}
