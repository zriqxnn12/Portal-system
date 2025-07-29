import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseScheduleRoutingModule } from './course-schedule-routing.module';
import { CourseScheduleComponent } from './course-schedule.component';
import { CourseScheduleListComponent } from './pages/course-schedule-list/course-schedule-list.component';
import { SharedModule } from '@shared/shared.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LessonCardDeskComponent } from './components/lesson-card-desk/lesson-card-desk.component';

@NgModule({
  declarations: [
    CourseScheduleComponent,
    CourseScheduleListComponent,
    CalendarComponent,
    LessonCardDeskComponent,
  ],
  imports: [
    CommonModule,
    CourseScheduleRoutingModule,
    SharedModule,
    FcFileInputModule,
  ],
})
export class CourseScheduleModule {}
