import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseScheduleRoutingModule } from './course-schedule-routing.module';
import { CourseScheduleComponent } from './course-schedule.component';
import { CourseScheduleListComponent } from './pages/course-schedule-list/course-schedule-list.component';
import { SharedModule } from '@shared/shared.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LessonCardDeskComponent } from './components/lesson-card-desk/lesson-card-desk.component';
import { AttendanceFormDialogComponent } from './components/attendance-form-dialog/attendance-form-dialog.component';
import { FcSelectOptionModule } from '@shared/components/fc-select-option/fc-select-option.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';

@NgModule({
  declarations: [
    CourseScheduleComponent,
    CourseScheduleListComponent,
    CalendarComponent,
    LessonCardDeskComponent,
    AttendanceFormDialogComponent,
  ],
  imports: [
    CommonModule,
    CourseScheduleRoutingModule,
    SharedModule,
    FcFileInputModule,
    FcSelectOptionModule,
    FcInputTextModule,
    FcImagePreviewModule,
  ],
})
export class CourseScheduleModule {}
