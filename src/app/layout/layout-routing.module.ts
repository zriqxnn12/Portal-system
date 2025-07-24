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
      {
        path: 'invoice',
        loadChildren: () =>
          import('../features/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('../features/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: 'event',
        loadChildren: () =>
          import('../features/event/event.module').then((m) => m.EventModule),
      },
      {
        path: 'course-schedule',
        loadChildren: () =>
          import('../features/course-schedule/course-schedule.module').then(
            (m) => m.CourseScheduleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
