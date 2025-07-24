import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseScheduleComponent } from './course-schedule.component';
import { CourseScheduleListComponent } from './pages/course-schedule-list/course-schedule-list.component';

const routes: Routes = [
  {
    path: '',
    component: CourseScheduleComponent,
    children: [
      {
        path: 'list',
        component: CourseScheduleListComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseScheduleRoutingModule {}
