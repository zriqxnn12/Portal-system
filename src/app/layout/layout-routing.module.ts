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
        path: 'user-profile',
        loadChildren: () =>
          import('../features/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      // {
      //   path: 'template-ui',
      //   loadChildren: () =>
      //     import('../features/template-ui/template-ui.module').then(
      //       (m) => m.TemplateUiModule
      //     ),
      // },
      // {
      //   path: 'calendar',
      //   loadChildren: () =>
      //     import('../features/calendar/calendar.module').then(
      //       (m) => m.CalendarModule
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
