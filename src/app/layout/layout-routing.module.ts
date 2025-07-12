import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'template-ui',
        loadChildren: () =>
          import('../features/template-ui/template-ui.module').then(
            (m) => m.TemplateUiModule
          ),
      },
      // {
      //   path: 'supplier',
      //   loadChildren: () =>
      //     import('../features/supplier/supplier.module').then(
      //       (m) => m.SupplierModule
      //     ),
      // },
      // {
      //   path: 'calendar',
      //   loadChildren: () =>
      //     import('../features/calendar/calendar.module').then(
      //       (m) => m.CalendarModule
      //     ),
      // },
      // {
      //   path: 'setting',
      //   loadChildren: () =>
      //     import('../features/setting/setting.module').then(
      //       (m) => m.SettingModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
